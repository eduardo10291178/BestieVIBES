        // JavaScript para mostrar los resultados en el ticket al cargar la página
        window.onload = () => {
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const name1 = urlParams.get('name1');
            const name2 = urlParams.get('name2');
            const percentage = urlParams.get('percentage');

            const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = `<h2>Compatibilidad</h2><p>${percentage}</p>`;
        };