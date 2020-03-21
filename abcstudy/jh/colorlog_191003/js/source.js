var upload_count = 0;

$(document).on("mouseenter", "path", function(e) {
  $('#info-box').css('display','block');
  $('#info-box').html($(this).data('info'));

});

$(document).on("mouseleave", "path", function(e) {
  $('#info-box').css('display','none');

});


$(document).on("click", "path", function(e) {
  $('#city_selector').html($(this).data('info'));
  

});

  
  $(document).mousemove(function(e) {

    $('#info-box').css('top',e.pageY-$('#info-box').height()-30);
    $('#info-box').css('left',e.pageX-($('#info-box').width())/2);
  }).mouseover();
  
  var ios = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  if(ios) {
    $('a').on('click touchend', function() { 
      var link = $(this).attr('href');   
      window.open(link,'_blank');
      return false;
    });
  }











  function wrapWindowByMask(){ // 화면 띄우기

    var maskHeight = $(document).height();  
    var maskWidth = $(window).width();  





    $('#Add_contents').css({'width':maskWidth,'height':maskHeight});  


    

    $('#Add_contents').fadeIn(1000);      
    $('#Add_contents').fadeTo("slow",0.8);    
    $('.writing_block').fadeTo("slow",1.0);



 
    $('.window').show();
}

$(document).ready(function(){
  
    $('.openMask').click(function(e){
        e.preventDefault();
        wrapWindowByMask();
    });

    



    //닫기 버튼을 눌렀을 때
    $('.close').click(function (e) {  

        e.preventDefault();  
        $('#Add_contents, .window').hide();  
    });       

    //검은 막을 눌렀을 때
    /*
    $('#Add_contents').click(function () {  
        $(this).hide();  
        $('.window').hide();  
    });      
    */
});




var BPOPUP_window='';
(function($) {
    $(function() {






          $('.openWindow').on("click", function(e) {
              e.preventDefault();
              $('.upload_grid_zone').empty(); // 창을 나갔다가 다시 들어오면 empty로 초기화 한 후,

              upload_count=0;
              
              $('.add_upload_grid').attr('disabled',false);
              $('.add_upload_grid').css('background-color','#fdf7bd');


              


              BPOPUP_window =  $('#ADD_STORY').bPopup({

                   modalClose : true
               });
            });    
     });
})(jQuery)

var BPOPUP_next='';
(function($) {
    $(function() {
          $('.next_button').on("click", function(e) {
              e.preventDefault();
              BPOPUP_window =  $('#ADD_STORY_2').bPopup({
                   
                   onOpen:BPOPUP_window.bPopup().close(),
                   modalClose : true
               });
            });    
     });
})(jQuery)


var BPOPUP_previous='';
(function($) {
    $(function() {
          $('.previous_button').on("click", function(e) {
              e.preventDefault();
              BPOPUP_window =  $('#ADD_STORY').bPopup({
                   
                   onOpen:$('#ADD_STORY_2').bPopup().close(),
                   modalClose : true
               });
            });    
     });
})(jQuery)


var BPOPUP_previous='';
(function($) {
    $(function() {
          $('.view_button').on("click", function(e) {
              var color_view = $(this).parent().attr('id');
              var color_numb = color_view.substr(color_view.length - 1);
              var color_code='';
              switch(color_numb){
                case '1':
                  color_code = "#f7ecc9"
                  break;

                case '2':
                  color_code = "#ffd8d0"
                  break; 

                case '3':
                  color_code = "#ffbcbc"
                  break;

                case '4':
                  color_code = "#9de9d3"
                  break;

                case '5':
                  color_code = "#93eedc"
                  break;

                case '6':
                  color_code = "#a5d0fc"
                  break;

                case '7':
                  color_code = "#87b1d1"
                  break;

                case '8':
                  color_code = "#d8d5fd"
                  break;

                case '9':
                  color_code = "#9e96dd"
                  break;

                case '0':
                  color_code = "#838a8d"
                  break;
              }



                


              

              $('.title_part').css('background-color', color_code);
              e.preventDefault();


              BPOPUP_window =  $('#VIEW_STORY').bPopup({
                   
                   
                   modalClose : true
               });
            });    
     });
})(jQuery)



// img 업로드


$(function() {
  $("#photo_select").on('change', function(){
      readURL(this);
  });
});

function readURL(input) {
  if (input.files && input.files[0]) {
  var reader = new FileReader();

  reader.onload = function (e) {
          $('#user_photo').attr('src', e.target.result);
      }

    reader.readAsDataURL(input.files[0]);
  }
}




$(function() {
  $("#photo_select_2").on('change', function(){
      readURL(this);
  });
});

function readURL(input) {
  if (input.files && input.files[0]) {
  var reader = new FileReader();

  reader.onload = function (e) {
          $('#user_photo_2').attr('src', e.target.result);
      }

    reader.readAsDataURL(input.files[0]);
  }
}




// 메인 그리드 부분

$(document).ready(function(){


  var $grid = $('.photo_grid').masonry({
    itemSelector: '.grid-item',
    columnWidth: 0

  });
  
  $grid.on( 'click', '.grid-item', function() {
    $( this ).toggleClass('grid-item--gigante');
    $grid.masonry();
  });
  





  $('.prepend-button').on( 'click', function() {
    var elems = [ getItemElement()];
    var $elems = $( elems );
    $('#ADD_STORY_2').bPopup().close();
    $grid.prepend( $elems ).masonry( 'prepended', $elems );
  });



  function getItemElement() {
    var elem = document.createElement('div');
 


    elem.className = 'grid-item ' 
    return elem;
  }
  
});


//메인 그리드 부분 종료



// 포토 그리드 부분


$(document).ready(function(){






  var $upload_grid = $('.upload_grid_zone').masonry({
    itemSelector: '.upload_grid',
    columnWidth: 10

  });
  

  $upload_grid.on( 'click', '.upload_grid', function( event ) {



    $('.add_upload_grid').attr('disabled',false);
    $('.add_upload_grid').css('background-color','#fdf7bd');

    $upload_grid.masonry( 'remove', event.currentTarget )

      .masonry();
  });
  // 그리드 누르면 삭제 기능


  var upload_numbering = 0; 
  // upload_count는 현재 그리드 개수를 세서 10개 초과되면 버튼 비활성화 하게 하는 용이고,
  // upload_numbering은 새로 생성된 그리드 뒤에 붙일 넘버링용 변수, upload_count 변수를 뒤에 붙여버리면 숫자가 겹치는 경우가 발생해버림

  upload_count = $(".upload_grid").length 


  // 업로드 그리드 생성 부분

  $('.add_upload_grid').on( 'click', function() {
    upload_numbering++;
    if(1){ // 사진 업로드 갯수는 최대 10개니까 제한걸기 , 누를때마다 단순 증가숫자를 카운트만 하는게 아니라 그리드 삭제할 경우도 생각해야 해서.. 음..

      $('.add_upload_grid').attr('disabled',false);
      upload_count = $(".upload_grid").length 

      if(upload_count==9){
        $('.add_upload_grid').css('background-color','grey');
        $('.add_upload_grid').attr('disabled',true);
      }
      
    }


    var upload_elems = [ getItemElement()];
    var $upload_elems = $( upload_elems );

    $upload_grid.prepend( $upload_elems ).masonry( 'prepended', $upload_elems );
  });



  function getItemElement() {
    var plus_img= '<img id = "plus_icon" src="img/plus.png">'; // 이거 이런식으로 객체 생성해서 append 하면 안들어감


    var upload_elem = document.createElement('div');
    var img_tag = document.createElement('img');


    img_tag.setAttribute('id','plus_icon');
    img_tag.setAttribute('src',"img/plus.png"); // DOM 객체로 접근해서 생성해야 로드됨
    

    var upload_img = document.createElement('img');

    upload_img.setAttribute('class', "upload_photo" +'_'+ upload_numbering)
    upload_img.setAttribute('src','#');
    upload_img.setAttribute('alt','');
    


    
    upload_elem.className = 'upload_grid'+' '+upload_numbering ;
    upload_elem.append(img_tag);
    upload_elem.append(upload_img);
    return upload_elem;
  }
  
});



//그리드 안에 사진 첨부하기




$(document).ready(function(){


  var grid_numbering = 0;
  var grid_selector='';

  $(function () {
    var obj = $(".upload_grid");

    $(document).on('dragenter', ".upload_grid", function(e){
      e.stopPropagation();
      e.preventDefault();
      $(this).css('border', '2px solid #5272A0');
    });




 
  
  


    $(document).on('dragleave', ".upload_grid", function(e){

      e.stopPropagation();
      e.preventDefault();
      $(this).css('border', '2px dotted #8296C2');
    });

    $(document).on('dragover', ".upload_grid", function(e){


      e.stopPropagation();
      e.preventDefault();
    });

    $(document).on('drop', ".upload_grid", function(e){


      e.preventDefault();
      $(this).css('border', '2px dotted #8296C2');
      grid_numbering = $(this).attr('class'); // drop 된 grid 인덱스를 클래스 값으로부터 읽어온다


      grid_selector = grid_numbering.charAt(grid_numbering.length-1); //마지막자리로 그리드 인덱스 구분하기




      var files = e.originalEvent.dataTransfer.files;
      if(files.length < 1)
           return;

      F_FileMultiUpload(files, obj);
    });


    $(document).on('click', ".upload_grid", function(e){

      var input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.setAttribute('multiple', true);
      input.style.display = 'none';
    });


  });

// 파일 멀티 업로드
function F_FileMultiUpload(files, obj) {
  if(confirm(files.length + "개의 사진을 업로드 하시겠습니까?") ) {

   

      var data = new FormData();
      for (var i = 0; i < files.length; i++) {

            if(files.length>10){
              alert('사진은 최대10장까지 업로드만 가능합니다')
              return false;
            }
            var img_naming ='.upload_photo' + '_' + grid_selector
   


            $(img_naming).attr('src', URL.createObjectURL(files[i]));
      
            data.append('file', files[i]);
          
    }

      var url = "<서버 파일업로드 URL>";
      $.ajax({
         url: url,
         method: 'post',
         data: data,
         dataType: 'json',
         processData: false,
         contentType: false,
         success: function(res) {
             F_FileMultiUpload_Callback(res.files);
         }
      });
  }
}

// 파일 멀티 업로드 Callback
function F_FileMultiUpload_Callback(files) {
  for(var i=0; i < files.length; i++)
      console.log(files[i].file_nm + " - " + files[i].file_size);
}




});





