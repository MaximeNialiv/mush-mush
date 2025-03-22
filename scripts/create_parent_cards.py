from supabase import create_client
import os

# Configuration Supabase
SUPABASE_URL = "https://qeswzexucwpzdwwtvpjk.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFlc3d6ZXh1Y3dwemR3d3R2cGprIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MTYwNjk3NiwiZXhwIjoyMDU3MTgyOTc2fQ.Sb0jKsnhBouKYCD3v1sjaUd8daIOsRGXBCOuPn_vRRA"

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

def create_parent_cards():
    try:
        # 1. Récupérer toutes les catégories
        print("1. Récupération des catégories...")
        categories = supabase.table('quiz_categories').select('*').execute()
        
        for category in categories.data:
            print(f"\nTraitement de la catégorie: {category['name']}")
            
            # 2. Vérifier si une carte parent existe déjà pour cette catégorie
            existing_parent = supabase.table('cards').select('*').eq('category_id', category['id']).eq('type', 'parent').execute()
            
            parent_id = None
            if existing_parent.data:
                parent_id = existing_parent.data[0]['id']
                print(f"  Carte parent existante trouvée: {existing_parent.data[0]['title']}")
            else:
                # 3. Créer la carte parent
                card_data = {
                    'title': f"Quiz {category['name']}",
                    'description': f"Collection de questions sur {category['name'].lower()}",
                    'type': 'parent',
                    'category_id': category['id']
                }
                parent_card = supabase.table('cards').insert(card_data).execute()
                parent_id = parent_card.data[0]['id']
                print(f"  Nouvelle carte parent créée: {card_data['title']}")
            
            # 4. Récupérer toutes les cartes de quiz de cette catégorie
            child_cards = supabase.table('cards').select('id').eq('category_id', category['id']).eq('type', 'qcm').execute()
            
            # 5. Créer les relations parent-enfant
            relations_count = 0
            for child in child_cards.data:
                # Vérifier si la relation existe déjà
                existing_relation = supabase.table('card_relationships').select('*').eq('parent_id', parent_id).eq('child_id', child['id']).execute()
                
                if not existing_relation.data:
                    try:
                        relationship_data = {
                            'parent_id': parent_id,
                            'child_id': child['id']
                        }
                        supabase.table('card_relationships').insert(relationship_data).execute()
                        relations_count += 1
                    except Exception as e:
                        print(f"  Erreur lors de la création de la relation pour la carte {child['id']}: {str(e)}")
            
            print(f"  {relations_count} nouvelles relations créées")
        
        print("\nCréation des cartes parent terminée avec succès!")
        
    except Exception as e:
        print(f"Erreur lors de la création des cartes parent: {str(e)}")

if __name__ == '__main__':
    create_parent_cards()
