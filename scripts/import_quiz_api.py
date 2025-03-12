import pandas as pd
import uuid
from datetime import datetime
import os
import re
from supabase import create_client

# Configuration Supabase
SUPABASE_URL = "https://qeswzexucwpzdwwtvpjk.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFlc3d6ZXh1Y3dwemR3d3R2cGprIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MTYwNjk3NiwiZXhwIjoyMDU3MTgyOTc2fQ.Sb0jKsnhBouKYCD3v1sjaUd8daIOsRGXBCOuPn_vRRA"

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

def clean_text(text):
    if pd.isna(text):
        return None
    # Nettoyer le texte
    text = str(text).strip()
    text = text.replace('\n', ' ')  # Remplacer les retours à la ligne par des espaces
    text = re.sub(r'\s+', ' ', text)  # Remplacer les espaces multiples par un seul espace
    return text

def split_answers(answer_text):
    """Sépare les réponses et identifie la bonne réponse."""
    if not answer_text or pd.isna(answer_text):
        return []
    
    # Nettoyer le texte
    answer_text = str(answer_text).strip()
    
    # Différents séparateurs possibles
    separators = ['\n', ';', '/', ',', ' ou ', ' OU ', ' et ', ' ET ']
    
    # Essayer chaque séparateur
    answers = []
    for sep in separators:
        if sep in answer_text:
            answers = [ans.strip() for ans in answer_text.split(sep) if ans.strip()]
            if len(answers) > 1:
                break
    
    # Si aucun séparateur n'a fonctionné, utiliser la réponse complète
    if not answers:
        answers = [answer_text]
    
    # Nettoyer les réponses
    answers = [re.sub(r'^[-•*]\s*', '', ans) for ans in answers]  # Enlever les puces
    answers = [re.sub(r'^\d+[.)]\s*', '', ans) for ans in answers]  # Enlever les numéros
    answers = [ans.strip() for ans in answers if ans.strip()]
    
    # Par défaut, la première réponse est considérée comme correcte
    # Les autres sont des distracteurs
    return [(ans, idx == 0) for idx, ans in enumerate(answers)]

def find_column_names(df):
    """Trouve les noms des colonnes pour les questions et réponses."""
    question_col = None
    answer_col = None
    
    # Chercher les colonnes
    for col in df.columns:
        col_lower = str(col).lower()
        if 'question' in col_lower or 'intitulé' in col_lower:
            question_col = col
        elif 'réponse' in col_lower or 'reponse' in col_lower:
            answer_col = col
    
    print(f"Colonnes trouvées:")
    print(f"  Question: {question_col}")
    print(f"  Réponses: {answer_col}")
    
    return question_col, answer_col

def import_quiz_data(excel_path):
    try:
        # Lire toutes les feuilles du fichier Excel
        xl = pd.ExcelFile(excel_path)
        
        total_questions = 0
        for sheet_name in xl.sheet_names:
            if sheet_name.lower() == 'readme' or sheet_name.startswith('copie de'):
                continue
                
            print(f"\nTraitement de la feuille: {sheet_name}")
            df = pd.read_excel(excel_path, sheet_name=sheet_name)
            
            # Trouver les colonnes
            question_col, answer_col = find_column_names(df)
            if not question_col or not answer_col:
                print(f"Structure non reconnue pour la feuille {sheet_name}, passage...")
                continue
            
            try:
                # Vérifier si la catégorie existe déjà
                category = supabase.table('quiz_categories').select('id').eq('name', sheet_name).execute()
                
                if category.data:
                    category_id = category.data[0]['id']
                    print(f"  Catégorie existante: {sheet_name}")
                else:
                    # Créer la catégorie
                    category_data = {
                        'name': sheet_name,
                        'description': f'Questions sur {sheet_name.lower()}'
                    }
                    category = supabase.table('quiz_categories').insert(category_data).execute()
                    category_id = category.data[0]['id']
                    print(f"  Nouvelle catégorie créée: {sheet_name}")
                
                question_count = 0
                for idx, row in df.iterrows():
                    question = clean_text(row[question_col])
                    if not question:
                        continue
                    
                    try:
                        # Créer la carte
                        card_data = {
                            'title': question,
                            'description': question,  # Utiliser la question comme description
                            'type': 'qcm',
                            'category_id': category_id
                        }
                        card = supabase.table('cards').insert(card_data).execute()
                        card_id = card.data[0]['id']
                        
                        # Traiter les options
                        answer_text = clean_text(row.get(answer_col))
                        options = split_answers(answer_text)
                        
                        # Insérer les options
                        if options:
                            for option_text, is_correct in options:
                                option_data = {
                                    'card_id': card_id,
                                    'text': option_text,
                                    'is_correct': is_correct
                                }
                                supabase.table('quiz_options').insert(option_data).execute()
                        
                        question_count += 1
                    except Exception as e:
                        print(f"  Erreur lors de l'import de la question {idx + 1}: {str(e)}")
                        continue
                
                total_questions += question_count
                print(f"  {question_count} questions importées")
            
            except Exception as e:
                print(f"Erreur lors du traitement de la feuille {sheet_name}: {str(e)}")
                continue
        
        print(f"\nTotal: {total_questions} questions importées")
    
    except Exception as e:
        print(f"Erreur lors de l'import des données: {str(e)}")

if __name__ == '__main__':
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_dir = os.path.dirname(script_dir)
    
    excel_path = os.path.join(project_dir, 'data', 'quiz.xlsx')
    
    import_quiz_data(excel_path)
