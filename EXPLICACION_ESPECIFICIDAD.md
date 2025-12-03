# Explicación de Especificidad CSS - Scroll Horizontal Cards

## 🔑 El Elemento HTML

En el componente `scroll-horizontal.tsx`, el div tiene **DOS clases**:

```tsx
<div className={`scroll-horizontal-card-image card-${card.id}`}>
```

Esto genera HTML como:
```html
<div class="scroll-horizontal-card-image card-1">  <!-- Card 1 -->
<div class="scroll-horizontal-card-image card-2">  <!-- Card 2 -->
<div class="scroll-horizontal-card-image card-3">  <!-- Card 3 -->
<div class="scroll-horizontal-card-image card-4">  <!-- Card 4 -->
```

## 📊 Cómo funciona la Especificidad CSS

### Selector Simple (Menos Específico)
```css
.scroll-horizontal-card-image {
  padding: 40px;  /* Aplica a TODOS los elementos con esta clase */
}
```
**Especificidad**: 1 clase = Baja especificidad

### Selector Múltiple (Más Específico)
```css
.scroll-horizontal-card-image.card-1 {
  padding: 50px;  /* Solo aplica a elementos con AMBAS clases */
}
```
**Especificidad**: 2 clases = Mayor especificidad

**IMPORTANTE**: Sin espacio entre las clases = "elemento con AMBAS clases"
- ✅ `.scroll-horizontal-card-image.card-1` → Elemento con ambas clases
- ❌ `.scroll-horizontal-card-image .card-1` → Elemento card-1 DENTRO de scroll-horizontal-card-image

## 🎯 Ejemplo Práctico

### HTML
```html
<div class="scroll-horizontal-card-image card-1">  <!-- Card 1 -->
<div class="scroll-horizontal-card-image card-2">  <!-- Card 2 -->
```

### CSS
```css
/* Regla base - Menos específica */
.scroll-horizontal-card-image {
  padding: 40px;  /* Aplica a ambos cards */
}

/* Regla específica - Más específica */
.scroll-horizontal-card-image.card-1 {
  padding: 60px;  /* SOLO aplica a card-1 */
}
```

### Resultado:
- **Card 1**: Tiene `padding: 60px` (usa la regla más específica)
- **Card 2**: Tiene `padding: 40px` (usa la regla base)

## 💡 ¿Por qué funciona?

CSS usa **cascada y especificidad**:
1. Busca todas las reglas que aplican al elemento
2. Compara la especificidad de cada regla
3. Aplica la regla con **MAYOR especificidad**

### Orden de Especificidad (de menor a mayor):
1. Una clase: `.scroll-horizontal-card-image` (especificidad: 10)
2. Dos clases: `.scroll-horizontal-card-image.card-1` (especificidad: 20)
3. Tres clases: `.scroll-horizontal-card-image.card-1.mobile` (especificidad: 30)

## 📱 En tu Caso (Mobile)

```css
/* Media query para mobile */
@media (max-width: 767px) {
  /* Regla base - Aplica a todos los cards en mobile */
  .scroll-horizontal-card-image {
    padding: 40px;
  }
  
  /* Regla específica - Sobrescribe solo para card-1 en mobile */
  .scroll-horizontal-card-image.card-1 {
    padding: 50px;  /* Solo card-1 tendrá 50px en mobile */
  }
  
  /* Regla específica - Sobrescribe solo para card-2 en mobile */
  .scroll-horizontal-card-image.card-2 {
    padding: 30px;  /* Solo card-2 tendrá 30px en mobile */
  }
}
```

## ✅ Resumen

- **Mismo nombre de clase NO es problema**: CSS no busca por "nombre", busca por **especificidad**
- **Más clases = Mayor especificidad**: `.a.b` tiene más peso que `.a`
- **Las reglas más específicas ganan**: Siempre se aplica la regla con mayor especificidad

