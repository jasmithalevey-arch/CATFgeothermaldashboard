# How to add a tab

Each tab is one JavaScript file in `js/tabs/`. The nav link and page panel are created automatically.

## Steps

1. **Copy a template.** Duplicate `js/tabs/economic-kpis.js` and rename it, for example `js/tabs/social-impact.js`.
2. **Edit the registration.**
   ```js
   Dashboard.registerTab({
     id: 'social-impact',        // unique, lowercase-with-hyphens; becomes the URL (#social-impact)
     label: 'Social Impact',     // text in the nav bar (keep it short)
     title: 'Social Impact',     // large heading at the top of the tab
     render(container) {         // runs the first time the tab is opened
       container.innerHTML = '<p>Your content here</p>';
     }
   });
   ```
3. **Register the file.** Add a script tag in `index.html` in the "Tabs" block. The order of the tags is the order of the nav bar:
   ```html
   <script src="js/tabs/social-impact.js"></script>
   ```
4. **Test.** Run `python3 -m http.server 8000` and visit http://localhost:8000. Check that the new link appears and that `#social-impact` opens it directly.

## Tips

- Put tab-specific styles in `css/styles.css` under a comment header with the tab name, and prefix class names with the tab id (for example `.social-impact-card`).
- To add a chart library (Chart.js, D3, Plotly), add its `<script>` tag in `index.html` above `js/app.js`.
- Keep data in `data/` as `.json` or `.csv` and load it inside `render()` with `fetch()`. Fetch needs a local server (not `file://`).
- To remove a tab, delete its script tag and its file.
- To rename or reorder, change `label` or move the script tag.

## Team workflow

One person per tab file means few merge conflicts. Work on a branch (`git checkout -b tab/capital-stack`), open a pull request, and have a teammate review before merging to `main`.
