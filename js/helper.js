var moduleHelper = (function () {
  function parseQueryString(query) {
    var vars = query.split("&");
    var query_string = {};
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      var key = decodeURIComponent(pair[0]);
      var value = decodeURIComponent(pair[1]);
      // If first entry with this name
      if (typeof query_string[key] === "undefined") {
        query_string[key] = decodeURIComponent(value);
        // If second entry with this name
      } else if (typeof query_string[key] === "string") {
        var arr = [query_string[key], decodeURIComponent(value)];
        query_string[key] = arr;
        // If third or later entry with this name
      } else {
        query_string[key].push(decodeURIComponent(value));
      }
    }
    return query_string;
  }

  function getQueryParams() {
    let url = window.location;
    let paramsString = url.pathname;
    let params = paramsString.split('/');
    // console.log(params);
    let result = {
      category: '',
      slug: '',
    };
    let paramsLenght = params.length;
    if (paramsLenght > 1) {
      result.category = params[1];
    }
    if (paramsLenght > 2) {
      result.slug = params[2];
    }
    return result;
  }

  function isEmpty(param) {
    return (
      !param || 0 === param.length || param.trim().length === 0
    );
  }

  function compareDateDesc(a, b) {
    const nameA = a.createdAt.toLowerCase();
    const nameB = b.createdAt.toLowerCase();
    let comparison = 0;
    if (nameA > nameB) {
      comparison = -1;
    } else if (nameA < nameB) {
      comparison = 1;
    }
    return comparison;
  }

  return {
    parseQueryString,
    getQueryParams,
    isEmpty,
    compareDateDesc,
  };
})();
