# Todo-lista – React/Vite

Detta är min todo-app för den 3:e uppgiften i Webbutveckling Frontend.

## Funktioner

- Lägga till todos via formulär (text, kategori, deadline)
- Markera todos som klara/ej klara
- Ta bort todos
- Filtrera på kategori (arbete, privat, studier)
- Sortera på deadline eller status (klar/ej klar)
- Räknare som visar `X kvar, Y klara`
- Todos sparas i `localStorage` och laddas vid start
- Drag-and-drop för att ändra ordning på todos när ingen sortering/filter är aktiv

## Teknik

- React med Vite (JavaScript)
- `useState` för todo-listan, filter och sortering
- `useEffect` för att synka state med `localStorage`
- Komponenter: `App`, `TodoInput`, `TodoItem`
- Drag-and-drop med `@hello-pangea/dnd`
- Egen CSS för dark theme, flex-layout och responsiv design

## Hur man kör

```bash
npm install
npm run dev
```

Öppna sedan http://localhost:5173 i webbläsaren.