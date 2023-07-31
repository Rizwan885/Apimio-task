// $(document).ready(function () {
//   const api_url = 'https://dummyjson.com/products';
//   const resultsPerPage = 8;
//   let currentPage = 1;
//   let totalProducts = 0;
//   let productData = [];

//   async function getapi(url) {
//     try {
//       // Storing response
//       const response = await fetch(url);

//       // Storing data in the form of JSON
//       const data = await response.json();
//       productData = data.products;
//       totalProducts = data.total;
//       displayProductResults();
//     } catch (error) {
//       console.error('An error occurred while fetching product data:', error);
//     }
//   }

//   // Calling the async function
//   getapi(api_url);

//   function displayProductResults() {
//     $('#productResults').empty();

//     const startIndex = (currentPage - 1) * resultsPerPage;
//     const endIndex = Math.min(startIndex + resultsPerPage, totalProducts);

//     for (let i = startIndex; i < endIndex; i++) {
//       const product = productData[i];
//       const productElement = `
//         <div class="grid-item">
//           <h1>${product.title}</h1>
//           <img src="${product.thumbnail}" alt="${product.title}" />
//           <p>${product.description}</p>
//           <p>Price: $${product.price}</p>
//           <p>Rating: ${product.rating}</p>
//         </div>
//       `;
//       $('#productResults').append(productElement);
//     }

//     // Show or hide "Load More" button based on the number of results displayed
//     if (endIndex < totalProducts) {
//       $('#loadMoreBtn').show();
//     } else {
//       $('#loadMoreBtn').hide();
//     }
//   }

//   $('#loadMoreBtn').click(function () {
//     currentPage++; // Increment current page on "Load More" button click
//     displayProductResults();
//   });

//   // Implement the search functionality
//   $('#searchForm').submit(function (event) {
//     event.preventDefault();
//     const searchTerm = $('#searchInput').val().toLowerCase();

//     // Filter the products based on the search term
//     const filteredProducts = productData.filter(
//       (product) =>
//         product.title.toLowerCase().includes(searchTerm) ||
//         product.description.toLowerCase().includes(searchTerm)
//     );

//     // Update the totalProducts count and reset the currentPage
//     totalProducts = filteredProducts.length;
//     currentPage = 1;

//     // Display the filtered results
//     displayProductResults();
//   });
// });

$(document).ready(function () {
  const api_url = 'https://dummyjson.com/products';
  const resultsPerPage = 8;
  let currentPage = 1;
  let totalProducts = 0;
  let productData = [];

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
      productData = data.products;
      totalProducts = data.total;
      displayProductResults();
    } catch (error) {
      console.error('An error occurred while fetching product data:', error);
      // Show an error message if the API call fails
      $('#productResults').html('<p>Error: Failed to fetch product data</p>');
    }
  }

  // Calling the async function
  getapi(api_url);

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
                <h1>${product.title}</h1>
                <img src="${product.thumbnail}" alt="${product.title}" />
                <p>${product.description}</p>
                <p>Price: $${product.price}</p>
                <p>Rating: ${product.rating}</p>
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
  $('#searchForm').submit(function (event) {
    event.preventDefault();
    const searchTerm = $('#searchInput').val().toLowerCase();

    // Filter the products based on the search term
    productData = productData.filter(
      (product) =>
        product.title.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );

    // Update the totalProducts count and reset the currentPage
    totalProducts = productData.length;
    currentPage = 1;

    // Display the filtered results or show "No records found" message
    displayProductResults();
  });
});
