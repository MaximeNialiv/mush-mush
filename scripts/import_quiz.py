import pandas as pd
import uuid
from datetime import datetime
import os

def clean_text(text):
    if pd.isna(text):
        return None
    return str(text).strip()

def generate_quiz_sql(excel_path, output_path):
    # Lire toutes les feuilles du fichier Excel
    xl = pd.ExcelFile(excel_path)
    
    # Préparer le fichier SQL
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write('-- Migration générée automatiquement pour l\'import des quiz\n')
        f.write('-- Date de génération: ' + datetime.now().strftime('%Y-%m-%d %H:%M:%S') + '\n\n')
        
        # Début de la transaction
        f.write('BEGIN;\n\n')
        
        for sheet_name in xl.sheet_names:
            if sheet_name.lower() == 'readme' or sheet_name.startswith('copie de'):
                continue
                
            print(f"Traitement de la feuille: {sheet_name}")
            df = pd.read_excel(excel_path, sheet_name=sheet_name)
            
            # Récupérer l'ID de la catégorie
            f.write(f"-- Questions pour la catégorie: {sheet_name}\n")
            f.write(f"WITH category AS (\n")
            f.write(f"    SELECT id FROM quiz_categories WHERE name = '{sheet_name}'\n")
            f.write(f")\n")
            
            for _, row in df.iterrows():
                question = clean_text(row.get('Question', ''))
                if not question:
                    continue
                    
                # Générer un UUID pour la carte
                card_id = str(uuid.uuid4())
                
                # Créer la carte
                f.write(f"INSERT INTO cards (id, title, type, category_id) \n")
                f.write(f"SELECT '{card_id}', '{question}', 'qcm', category.id \n")
                f.write(f"FROM category;\n\n")
                
                # Traiter les options
                options = []
                for i in range(1, 5):  # Supposons un maximum de 4 options
                    option_text = clean_text(row.get(f'Réponse {i}', ''))
                    if option_text:
                        is_correct = bool(row.get(f'Correct {i}', False))
                        options.append((option_text, is_correct))
                
                # Insérer les options
                for option_text, is_correct in options:
                    option_id = str(uuid.uuid4())
                    f.write(f"INSERT INTO quiz_options (id, card_id, text, is_correct) \n")
                    f.write(f"VALUES ('{option_id}', '{card_id}', '{option_text}', {str(is_correct).lower()});\n")
                
                f.write('\n')
        
        # Fin de la transaction
        f.write('COMMIT;\n')

if __name__ == '__main__':
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_dir = os.path.dirname(script_dir)
    
    excel_path = os.path.join(project_dir, 'data', 'quiz.xlsx')
    output_path = os.path.join(project_dir, 'supabase', 'migrations', '20250312_003_quiz_import.sql')
    
    generate_quiz_sql(excel_path, output_path)
    print(f"Migration SQL générée avec succès: {output_path}")
