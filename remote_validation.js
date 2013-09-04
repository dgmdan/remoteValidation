( function( $ ) {
  var RemoteValidation = {
    defaults: {
      noErrorClass: 'field',
      errorClass : 'field_with_errors'
    },
    showErrors: function(form, settings, errors) {
      var formFor = form.attr('id').replace(/new_/,"");
      for (var col in errors) {
        for (var i in errors[col]) {
          var field = $("#"+formFor+"_"+col);
          field.attr('title', errors[col][i]);
          field.tipsy({trigger:'manual'});
          field.tipsy('show');
          field.blur(function() {
            field.removeClass(settings.errorClass);
            field.removeClass(settings.errorClass);
            field.tipsy('hide');
          });
        }
      }
    }
  };
  $.fn.remoteValidation = function(options) {
    var settings = $.extend( RemoteValidation.defaults, options);
    return this.each( function() {
      var $this = $(this); //$(this), may change inside function, so assign it to $this.
      $this.on('ajax:beforeSend', function(evt,xhr) {
        $("."+settings.errorClass, $this).children().unwrap();
      }).on('ajax:success', function(evt,data,status,xhr) {
      }).on('ajax:error', function(evt, xhr, status, error) {
      }).on('ajax:complete', function(evt, xhr, status){
        var data = JSON.parse(xhr.responseText);
        if (data.errors) {
          RemoteValidation.showErrors($this, settings, data.errors);
        } else if (data.location) {
          window.location.href = data.location;
        }
      });
    });
  };
})(jQuery);
