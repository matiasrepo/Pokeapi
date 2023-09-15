document.addEventListener("DOMContentLoaded", function () {
    const searchButton = document.getElementById("searchButton");
    const pokemonNumberInput = document.getElementById("pokemonNumber");
    const pokemonContainer = document.getElementById("pokemonContainer");
    const errorElement = document.getElementById("error"); // Elemento de error

    searchButton.addEventListener("click", function () {
        const pokemonNumber = pokemonNumberInput.value.trim();

        function showError(message) {
            errorElement.textContent = message;
            pokemonContainer.innerHTML = "";
        }

        if (!pokemonNumber || isNaN(pokemonNumber)) {
            showError("Por favor, ingrese un número válido.");
            return;
        }

        // Limpiar el mensaje de error antes de realizar una búsqueda exitosa
        errorElement.textContent = "";

        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("No se encontró ningún Pokémon con ese número.");
                }
                return response.json();
            })
            .then((data) => {
                const { name, types, height, weight, sprites } = data;
                const typeNames = types.map((type) => type.type.name).join(", ");
                const heightMeters = (height / 10).toFixed(1);
                const weightKilograms = (weight / 10).toFixed(1);

                const pokemonCard = `
                    <div class="card">
                        <h2>${name}</h2>
                        <p><strong>Tipo:</strong> ${typeNames}</p>
                        <p><strong>Altura:</strong> ${heightMeters} m</p>
                        <p><strong>Peso:</strong> ${weightKilograms} kg</p>
                        <img src="${sprites.front_default}" alt="${name}">
                    </div>
                `;

                pokemonContainer.innerHTML = pokemonCard;
            })
            .catch((error) => {
                showError(error.message);
            });
    });

    // Permitir solo números en el campo de entrada
    pokemonNumberInput.addEventListener("input", function () {
        this.value = this.value.replace(/[^0-9]/g, "");
    });
});
