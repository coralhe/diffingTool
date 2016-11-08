
  $(function(){

    var contentDiff = {}
    contentDiff.getcodedeckContent = '';
    contentDiff.gethtmlContent = '';

    contentDiff.init = function(){
      tinymce.init({
        selector:'#codedeckContainer',
        setup: function(editor) {
          contentDiff.getcodedeckContent = editor;
        }
      });

      tinymce.init({
        selector:'#htmlContainer',
        setup: function(editor) {
          contentDiff.gethtmlContent = editor;
        }
      });
    }

    contentDiff.cleanContent = function($rootContentEl){

      $rootContentEl.find('*').each(function(){


        var $thisEle = $(this)
        //remove spans
        if($thisEle.prop('tagName') ==='SPAN'){
          $thisEle.replaceWith($thisEle[0].innerHTML)
        }
        // change all <i> -> <em> 
        if($thisEle.prop('tagName') ==='I'){
          $thisEle.replaceWith('<em>' + $thisEle.html() +'</em>')
        }
        // change all <b> -> <strong> 
        if($thisEle.prop('tagName') ==='B'){
          $thisEle.replaceWith('<strong>' + $thisEle.html() +'</strong>')
        }
        //change <h*> -> <p>
        if(['H1','H2','H3','H4','H5'].indexOf($thisEle.prop('tagName')) > -1 ){
          $thisEle.replaceWith('<p>' + $thisEle.html() +'</p>')
        }
        //remove whitespace nodes
        if($.trim($thisEle.text()) === ''){
          $thisEle.remove()
        }
        //replace &nbsp with  " "
        // $thisEle.html($thisEle.html().replace('&nbsp;', ' '))
        // console.log($thisEle.html())
        //remove all the html attributes 
        var attributes = this.attributes;
        var i = attributes.length;
        while( i-- ){
          this.removeAttributeNode(attributes[i]);
        }
      });
    }


    contentDiff.init();

    $('#diffButton').on('click', function(){

      var $rootCodedeckContentEl = $('<div>' + contentDiff.getcodedeckContent.getContent() + '</div>');
      var $roothtmlContentEl = $('<div>' + contentDiff.gethtmlContent.getContent() + '</div>');

      contentDiff.cleanContent($rootCodedeckContentEl);
      contentDiff.cleanContent($roothtmlContentEl);
      
      $('#res').html(diffString(
        $rootCodedeckContentEl[0].innerHTML,$roothtmlContentEl[0].innerHTML
      ));
      
      console.log('codedeck: ' + $rootCodedeckContentEl[0].innerHTML );
      console.log('html: ' + $roothtmlContentEl[0].innerHTML)
    })

  })