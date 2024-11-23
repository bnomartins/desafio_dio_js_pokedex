const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    console.log(pokemon)
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

            <button id="btn_details_${pokemon.number}" 
            data-modal-target="static-modal" 
            data-modal-toggle="static-modal" 
            onclick="modalControl(${pokemon.number})"
            class="block ring-1 ring-blue-300 p-4 rounded-md hover:bg-blue-100" type="button">
                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </button>
          
          <!-- Main modal -->
          <div id="details-modal_${pokemon.number}" 
          data-modal-backdrop="static" tabindex="-1" aria-hidden="true" 
            class="hidden overflow-y-auto overflow-x-hidden fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-80">
                          <div class="relative p-4 w-full max-w-2xl max-h-full">
                  <!-- Modal content -->
                  <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                      <!-- Modal header -->
                      <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                          <h3 class="text-xl font-semibold text-gray-900 dark:text-white uppercase">
                          ${pokemon.name}
                          </h3>
                          <button 
                            type="button" 
                            id="btn_close_details" 
                            onclick="modalControl(${pokemon.number})"
                            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="static-modal">
                              <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                              </svg>
                              <span class="sr-only">Fechar</span>
                          </button>
                      </div>
                      <!-- Modal body -->
                      <div class="p-4 md:p-5 space-y-4">
                                      <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
                          <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400 w-full">
                            Nome: ${pokemon.name}
                          </p>
                          <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400 w-full">
                            Tipo: ${pokemon.type}
                          </p>
                          <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400 w-full">
                            Descrição: Não disponível.
                          </p>
                      </div>
                      <!-- Modal footer -->
                      <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                          <button onclick='modalControl(${pokemon.number})' data-modal-hide="static-modal" type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Fechar</button>
                      </div>
                  </div>
              </div>
          </div>


            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})


function modalControl(n){
    const modal = document.getElementById('details-modal_'+n);
    modal.classList.toggle('hidden');

    }

    

