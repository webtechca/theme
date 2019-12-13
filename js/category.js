var moduleCategory = (function () {
  var categoryContents = [];
  function handleReady() {
    let params = moduleHelper.getQueryParams();
    let category = params.category;
    if (category === '') {
      // window.location.href = '/';
      return false;
    }
    getCategoryContents(category);
    $('.nav-link[data-category=' + category + ']').addClass('active');
  }

  function handleSearch() {
    // categoryContents is from getCategoryContents
    let term = $(this).val();
    let termLength = term.length;
    if (termLength === 0) {
      printCategory(categoryContents);
      return true;
    } else if (termLength <= 2) {
      return false;
    }
    term = term.toLowerCase();
    var results = [];
    $.each(categoryContents, function (index, post) {
      let title = post.title.toLowerCase();
      let description = post.description.toLowerCase();
      if (title.indexOf(term) !== -1 || description.indexOf(term) !== -1) {
        results.push(post);
      }
    });
    printCategory(results);
  }

  function getCategoryContents(category) {
    $.getJSON(`/contents/${category}.json`, function (data) {
      data.sort(moduleHelper.compareDateDesc);
      categoryContents = data;
      printCategory(data);
    });
  }

  function printCategory(categories) {
    let output = '';
    $.each(categories, function (key, post) {
      let status = post.status;
      if (status === 'private') {
        // equivalent of 'continue'
        return true;
      }
      let slug = post.slug;
      let thumbnail = post.thumbnail;
      let title = post.title;
      let category = post.category;
      let description = post.description;
      output +=
        `
        <div class="col-md-4 col-sm-6 portfolio-item">
          <a class="portfolio-link" href="/${category}/${slug}">
            <div class="portfolio-hover">
              <div class="portfolio-hover-content">
                <i class="fas fa-plus fa-3x"></i>
              </div>
            </div>
            <img class="img-fluid" src="${thumbnail}" alt="${category}">
          </a>
          <div class="portfolio-caption">
            <h4>${title}</h4>
            <p class="text-muted">${description}</p>
          </div>
        </div>
        `;
    });
    $('.js-portfolio-wrapper').html(output);
  }

  return {
    handleReady,
    handleSearch,
  };
})();

$(document)
  .ready(moduleCategory.handleReady)
  .on('input', '.js-search-input', moduleCategory.handleSearch);