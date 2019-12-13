var moduleSingle = (function () {
  function handleReady() {
    let params = moduleHelper.getQueryParams();
    let category = params.category;
    let slug = params.slug;
    if (category === '' || slug === '') {
      // window.location.href = '/';
      return false;
    }
    getSlugContent(category, slug);
  }

  function getSlugContent(category, slug) {
    $.get(`/contents/${category}/${slug}.html`, function (data) {
      var content = data;
      $.getJSON(`/contents/${category}.json`, function (data) {
        $.each(data, function (key, post) {
          if (post.slug === slug) {
            let output = '';
            let thumbnail = post.thumbnail;
            let title = post.title;
            let description = post.description;
            let createdAt = post.createdAt;

            // <li>Client: Windows</li>
            output +=
              `
            <div class="container">
              <h2 class="text-uppercase">${title}</h2>
              <p class="item-intro text-muted">${description}</p>
              <img class="img-fluid d-block mx-auto" src="${thumbnail}" alt="">
              <div class="space-above-big">${content}</div>
              <ul class="list-inline space-above">
                <li>Date: ${createdAt}</li>
                <li>Category: ${category}</li>
              </ul>
            </div>
            `;
            $('.js-portfolio-item').html(output);
            return true;
          }
        });
      });
    }).fail(function () {
      let output =
      `
      <div class="container">
        <h2 class="text-uppercase">Not Found</h2>
        <p class="item-intro text-muted">Lorem ipsum dolor sit amet consectetur.</p>
        <p>Use this area to describe your project. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est
          blanditiis dolorem culpa incidunt minus dignissimos deserunt repellat aperiam quasi sunt officia
          expedita beatae cupiditate, maiores repudiandae, nostrum, reiciendis facere nemo!</p>
        <ul class="list-inline">
          <li><a href="/games">Games</a></li>
          <li><a href="/arts">Arts</a></li>
          <li><a href="/apps">Apps</a></li>
        </ul>
      </div>
      `;
      $('.js-portfolio-item').html(output);
    });
  }

  return {
    handleReady,
  };
})();

$(document)
  .ready(moduleSingle.handleReady);