import React, { useState } from 'react';
import { Utensils, ChefHat, Sparkles, Clock, Check, Plus, Trash2 } from 'lucide-react';

export default function RecipeAssistant() {
  const [ingredients, setIngredients] = useState(['bananas', 'bread', 'milk']);
  const [newIngredient, setNewIngredient] = useState('');
  const [recipes, setRecipes] = useState(null);
  const [loading, setLoading] = useState(false);

  const quickAddPresets = ['tomatoes', 'carrots', 'eggs', 'rice', 'onion', 'cheese', 'apples', 'potatoes'];

  const handleAddIngredient = (item) => {
    const clean = item.trim().toLowerCase();
    if (clean && !ingredients.includes(clean)) {
      setIngredients([...ingredients, clean]);
    }
    setNewIngredient('');
  };

  const handleRemoveIngredient = (item) => {
    setIngredients(ingredients.filter((i) => i !== item));
  };

  const handleGenerateRecipes = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/ai/generate-recipe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredients })
      });

      if (res.ok) {
        const data = await res.json();
        setRecipes(data.recipes);
      } else {
        throw new Error('API failed');
      }
    } catch (err) {
      // Fallback
      setRecipes([
        {
          title: "Golden Banana & Stale Bread French Toast Bake",
          ingredients_used: ["bananas", "bread", "milk"],
          prep_time: "20 mins",
          waste_reduction_tier: "High Impact",
          instructions: [
            "Slice stale bread into 1-inch cubes and layer in a baking dish.",
            "Whisk milk, eggs, cinnamon, and mashed overripe bananas until smooth.",
            "Pour mixture over bread cubes and let absorb for 10 minutes.",
            "Bake at 180°C (350°F) for 25 minutes until golden brown and caramelized."
          ],
          nutrition_per_serving: "320 kcal, 9g Protein, 4g Fiber"
        },
        {
          title: "Rich Vegetable Peel & Herb Umami Broth",
          ingredients_used: ["carrots", "onion", "herbs"],
          prep_time: "45 mins",
          waste_reduction_tier: "Zero-Waste Master",
          instructions: [
            "Collect washed carrot peels, onion skins, and herb stems.",
            "Sauté scraps in olive oil for 5 minutes to release aromatic compounds.",
            "Cover with 2 liters of water, add bay leaf and peppercorns.",
            "Simmer on low heat for 40 minutes, strain liquid into airtight glass jars."
          ],
          nutrition_per_serving: "45 kcal, Rich in Electrolytes & Minerals"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section style={{ margin: '0 1.5rem 2.5rem 1.5rem' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
          <ChefHat color="#10b981" size={24} />
          <h3 style={{ fontSize: '1.6rem' }}>Zero-Waste AI Chef & Recipe Generator</h3>
        </div>
        <p style={{ color: 'var(--text-secondary)' }}>
          Turn leftover pantry items, overripe produce, or stale bread into delicious gourmet meals instead of throwing them away.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        
        {/* Ingredient Input Column */}
        <div className="glass-panel" style={{ padding: '1.75rem' }}>
          <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Pantry & Fridge Leftovers</h4>

          {/* Tag List */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.25rem', minHeight: '60px' }}>
            {ingredients.map((ing) => (
              <span 
                key={ing} 
                style={{
                  background: 'rgba(16, 185, 129, 0.2)',
                  border: '1px solid rgba(16, 185, 129, 0.4)',
                  padding: '0.4rem 0.75rem',
                  borderRadius: '9999px',
                  fontSize: '0.85rem',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}
              >
                {ing}
                <Trash2 size={14} color="#f87171" style={{ cursor: 'pointer' }} onClick={() => handleRemoveIngredient(ing)} />
              </span>
            ))}
          </div>

          {/* Add Input */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <input 
              type="text"
              placeholder="Add an ingredient (e.g. spinach, rice)..."
              value={newIngredient}
              onChange={(e) => setNewIngredient(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddIngredient(newIngredient)}
              style={{
                flex: 1,
                padding: '0.75rem 1rem',
                background: 'rgba(0,0,0,0.3)',
                border: '1px solid var(--border-glass)',
                borderRadius: 'var(--radius-sm)',
                color: '#fff',
                outline: 'none',
                fontSize: '0.9rem'
              }}
            />
            <button className="btn-secondary" onClick={() => handleAddIngredient(newIngredient)}>
              <Plus size={18} /> Add
            </button>
          </div>

          {/* Quick Presets */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Quick Add Common Items:</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
              {quickAddPresets.map((preset) => (
                <button
                  key={preset}
                  onClick={() => handleAddIngredient(preset)}
                  style={{
                    padding: '0.25rem 0.6rem',
                    borderRadius: '4px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    fontSize: '0.75rem',
                    color: 'var(--text-secondary)',
                    cursor: 'pointer'
                  }}
                >
                  + {preset}
                </button>
              ))}
            </div>
          </div>

          <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={handleGenerateRecipes} disabled={loading}>
            <Sparkles size={18} /> {loading ? 'Cooking AI Recipes...' : 'Generate Zero-Waste Recipes'}
          </button>
        </div>

        {/* Recipes Display Column */}
        <div className="glass-panel" style={{ padding: '1.75rem' }}>
          {!recipes ? (
            <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>
              <Utensils size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
              <p style={{ fontSize: '1rem' }}>Add your leftover ingredients on the left to generate customized recipes.</p>
            </div>
          ) : (
            <div>
              <h4 style={{ fontSize: '1.2rem', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-glass)', paddingBottom: '0.5rem' }}>
                AI Recipe Suggestions ({recipes.length})
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {recipes.map((recipe, idx) => (
                  <div key={idx} className="glass-card" style={{ background: 'rgba(0,0,0,0.3)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                      <h5 style={{ fontSize: '1.1rem', color: '#34d399' }}>{recipe.title}</h5>
                      <span className="badge badge-medium">
                        <Clock size={12} /> {recipe.prep_time}
                      </span>
                    </div>

                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                      <strong>Nutrition:</strong> {recipe.nutrition_per_serving}
                    </div>

                    <div style={{ marginBottom: '0.5rem' }}>
                      <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#ffffff', marginBottom: '0.35rem' }}>Instructions:</div>
                      <ol style={{ paddingLeft: '1.2rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                        {recipe.instructions.map((step, sIdx) => (
                          <li key={sIdx} style={{ marginBottom: '0.3rem' }}>{step}</li>
                        ))}
                      </ol>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
