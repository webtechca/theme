var moduleIndex = (function () {
  function handleReady() {
    $(".js-contact-form input, .js-contact-form textarea").jqBootstrapValidation({
      preventSubmit: true,
      submitError: function ($form, event, errors) {
        // additional error messages or events
      },
      submitSuccess: function ($form, event) {
        event.preventDefault();

        var name = $("#name").val().trim();
        var email = $("#email").val().trim();
        var subject = $("#subject").val().trim();
        var message = $("textarea#message").val().trim();
        var firstName = name;

        if (firstName.indexOf(' ') >= 0) {
          firstName = name.split(' ').slice(0, -1).join(' ');
        }
        $this = $(".js-send-message");
        $this.prop("disabled", true);
        $.ajax({
          url: "http://mailcentral.webnest.site",
          type: "POST",
          data: {
            name: name,
            email: email,
            subject: subject,
            message: message
          },
          cache: false,
          success: function () {
            // Success message
            $('#success').html("<div class='alert alert-success'>");
            $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
              .append("</button>");
            $('#success > .alert-success')
              .append("<strong>Your message has been sent. </strong>");
            $('#success > .alert-success')
              .append('</div>');
            //clear all fields
            $('.js-contact-form').trigger("reset");
          },
          error: function () {
            // Fail message
            $('#success').html("<div class='alert alert-danger'>");
            $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
              .append("</button>");
            $('#success > .alert-danger').append($("<strong>").text("Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!"));
            $('#success > .alert-danger').append('</div>');
            //clear all fields
            $('.js-contact-form').trigger("reset");
          },
          complete: function () {
            setTimeout(function () {
              $this.prop("disabled", false);
            }, 1000);
          }
        });
      },
      filter: function () {
        return $(this).is(":visible");
      },
    });
  }


  return {
    handleReady,
  };
})();

$(document)
  .ready(moduleIndex.handleReady);