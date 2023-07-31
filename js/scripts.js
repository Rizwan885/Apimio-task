$(document).ready(function () {
  // According to api endpoint it fetchs single movie on searching title
  const initial_api_url = 'http://www.omdbapi.com/?t=A&apikey=83bdc4d8'; // Initial endpoint with title A
  const search_api_url = 'http://www.omdbapi.com/?apikey=83bdc4d8';
  const resultsPerPage = 8;
  let currentPage = 1;
  let totalProducts = 0;
  let productData = []; // Handles movie product information

  async function getapi(url) {
    try {
      // Storing response
      const response = await fetch(url);
      // Check if the response is successful
      if (!response.ok) {
        throw new Error('Failed to fetch product data');
      }

      // Storing data in the form of JSON
      const data = await response.json();
      console.log(data);
      productData = data.products;
      totalProducts = data.total;
      displayProductResults();
    } catch (error) {
      console.error('An error occurred while fetching product data:', error);
      // Show an error message if the API call fails
      $('#productResults').html('<p>Error: Failed to fetch product data</p>');
    }
  }

  // Calling the initial API function
  getapi(initial_api_url);

  function displayProductResults() {
    $('#productResults').empty();

    const startIndex = (currentPage - 1) * resultsPerPage;
    const endIndex = Math.min(startIndex + resultsPerPage, totalProducts);

    if (startIndex >= totalProducts || endIndex <= 0) {
      $('#productResults').html('<p>No records found</p>');
      $('#loadMoreBtn').hide();
    } else {
      for (let i = startIndex; i < endIndex; i++) {
        const product = productData[i];
        const productElement = `
          <div class="grid-item">
            <h1>${product.Title}</h1>
            <img src="${product.Poster}" alt="${product.Title}" />
            <p>${product.Plot}</p>
            <p>Runtime: ${product.Runtime}</p>
            <p>Rating: ${product.imdbRating}</p>
          </div>
        
        `;
        $('#productResults').append(productElement);
      }

      // Show or hide "Load More" button based on the number of results displayed
      if (endIndex < totalProducts) {
        $('#loadMoreBtn').show();
      } else {
        $('#loadMoreBtn').hide();
      }
    }
  }

  $('#loadMoreBtn').click(function () {
    currentPage++; // Increment current page on "Load More" button click
    displayProductResults();
  });

  // Implement the search functionality
  $('#searchForm').submit(async function (event) {
    event.preventDefault();
    const searchTerm = $('#searchInput').val().toLowerCase();
    const searchUrl = `${search_api_url}&t=${searchTerm}`;

    try {
      // Storing response
      const response = await fetch(searchUrl);

      // Check if the response is successful
      if (!response.ok) {
        throw new Error('Failed to fetch search results');
      }

      // Storing data in the form of JSON
      const data = await response.json();
      if (data.Response === 'True') {
        productData = [data];
        totalProducts = 1;
        currentPage = 1;
      } else {
        productData = [];
        totalProducts = 0;
        currentPage = 1;
      }

      // Display the search results or show "No records found" message
      displayProductResults();
    } catch (error) {
      console.error('An error occurred while fetching search results:', error);
      // Show "No records found" message if the search query returns no results
      $('#productResults').html('<p>No records found</p>');
    }
  });
});
