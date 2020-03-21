var upload_count = 0;
//var new_color ='';

		// 글쓰기 부분




$(document).on("mouseenter", "path", function(e) {
  $('#info-box').css('display','block');
  $('#info-box').html($(this).data('info'));

});

$(document).on("mouseleave", "path", function(e) {
  $('#info-box').css('display','none');

});


var path_clicked_count = 0; /* 한번 지역 클릭헀을때 색 표시, 이후에 다른 지역 클릭하면 그 지역 색 꺼지도록  */ 

/*해당 지역을 클릭했을때 지역 이름하고 지도에는 색 표시 */ 
$(document).on("click", "path", function(e) {
  $('#city_selector').html($(this).data('info'));

  if(path_clicked_count==0){
    $('path').not('path.island').attr('fill',"#B9B9B9");
    $(this).attr('fill','#c7bf4b');
    path_clicked_count=1;

  }

  else if(path_clicked_count==1){
    $('path').not('path.island').attr('fill',"#B9B9B9");
    $(this).attr('fill','#c7bf4b');

 

  }



  

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
     $(document).on("click",".prepend_____button", function() {
	
	var form = $("#ajaxform")[0]; // form태그로 둘러싸인 모든 값을 받는 배열.
	var formData = new FormData(form); // formdata로 값을 불러들인다.
	
	// formdata는 key:value로 이루어진 하나의 딕셔너리
	// append 메서드로 값을 추가한다. key값과 value값으로 입력받는 값을 구분한다.
	formData.append("img", $("#uploadimage")[0].files[0]); // image 값
	formData.append("region", $("#reg_code").val());
	formData.append("spot", $('#place_title').val());
	formData.append("begin_date", $('#date1').val());
	formData.append("end_date", $('#date2').val());
	formData.append("text", $('#story_p').val());
	
	
	
	$.ajax({
		url : '/write/',
		type: 'POST',
		processData: false,
		contentType: false,
		data : formData,
		dataType : 'json',
		success:function(e){
			alert("테스트");	
		},
		error:function(e){
			console.log(formData.get('img'));
			console.log(formData.get('text'));
			console.log(formData.get('region'));
		}
	});
	
	window.location.href = "/";
	location.reload();
	
  
    $('.openMask').click(function(e){
        e.preventDefault();
        wrapWindowByMask();
    });
 	});
	
	
	
	

    



    //닫기 버튼을 눌렀을 때
    // $('.close').click(function (e) {  

    //     e.preventDefault();  
    //     $('#Add_contents, .window').hide();  
    // });       

    //검은 막을 눌렀을 때
    /*
    $('#Add_contents').click(function () {  
        $(this).hide();  
        $('.window').hide();  
    });      
    */
});

var howto_window='';
(function($) {
    $(function() {






          $('.my_page').on("click", function(e) {
  
   


              howto_window =  $('#mypage_window').bPopup({

                   modalClose : true
               });
            });    
     });
})(jQuery)


var BPOPUP_window='';
(function($) {
    $(function() {






          $('.openWindow').on("click", function(e) {
   
              $('.upload_grid_zone').empty(); // 창을 나갔다가 다시 들어오면 empty로 초기화 한 후,

             upload_count=0;
              
              $('.add_upload_grid').attr('disabled',false);
              $('.add_upload_grid').css('background','url("/static/img/plus_button.png" ) no-repeat;');


              


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





/* 사용법(howto_part) 띄우는 기능 */


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
 
	


/* 글쓰기 버튼 눌렀을때(writting) 그리드 생성 */



  function getItemElement() {
    var elem = document.createElement('div');
 


    elem.className = 'grid-item ' 
    return elem;
  }
  
});


//메인 그리드 부분 종료



	
	function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
          var cookies = document.cookie.split(';');
          for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
            }
          }
        }
        return cookieValue;
      }
	
	function csrfSafeMethod(method) {
        // these HTTP methods do not require CSRF protection
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
      }
      $(document).ready(function() {
        var csrftoken = getCookie('csrftoken');
        $.ajaxSetup({
          beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
              xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
          }
        });
      });
 


$(document).ready(function(){// 스토리라인 색 결정 부분




  $('.color_bar_0').on("click", function(e) {
   
    $(".gradi_storyline").css("background",'linear-gradient(-45deg,  #fefff3,#fff7dc,#ffeaa7)');
    $(".gradi_storyline").css("animation",'gradientBG 15s ease infinite');
	//new_color = '#ffeaa7';
    e.preventDefault();

  });

  
  $('.color_bar_1').on("click", function(e) {
   
    $(".gradi_storyline").css("background",'linear-gradient(-45deg, #fffbfb,#ffded6,#fab1a0)');
    $(".gradi_storyline").css("animation",'gradientBG 15s ease infinite');
   //content.trigger( "create" );
	//new_color = '#fab1a0'; 
    e.preventDefault();

  });

  
  $('.color_bar_2').on("click", function(e) {
   
    $(".gradi_storyline").css("background",'linear-gradient(-45deg, #fff5f5,#ffb5b5,#ff7675)');
    $(".gradi_storyline").css("animation",'gradientBG 15s ease infinite');
	//new_color = '#ff7675'; 
    e.preventDefault();

  });


  
  $('.color_bar_3').on("click", function(e) {
   
    $(".gradi_storyline").css("background",'linear-gradient(-45deg, #effffb,#a4ffe6,#55efc4)');
    $(".gradi_storyline").css("animation",'gradientBG 15s ease infinite');
	//new_color = '#55efc4';
   // content.trigger( "create" );
    e.preventDefault();

  });

  
  $('.color_bar_4').on("click", function(e) {
   
    $(".gradi_storyline").css("background",'linear-gradient(-45deg, #ecfffb,#86f0db,#00b894)');
    $(".gradi_storyline").css("animation",'gradientBG 15s ease infinite');
	//new_color = '#00b894';
    e.preventDefault();

  });

  
  $('.color_bar_5').on("click", function(e) {
   
    $(".gradi_storyline").css("background",'linear-gradient(-45deg, #f8fcff,#c8e3ff,#74b9ff)').trigger("create");
  //  $('.gradi_storyline').html(data).trigger("create");
	$(".gradi_storyline").css("animation",'gradientBG 15s ease infinite');
	//new_color = '#74b9ff';
    e.preventDefault();

  });

  
  $('.color_bar_6').on("click", function(e) {
   
    $(".gradi_storyline").css("background",'linear-gradient(-45deg, #eef8ff,#eef8ff,#0984e3)').trigger("create");
	//new_color = '#0984e3';
   // $('.gradi_storyline').html(data).trigger("create");
    e.preventDefault();

  });

  
  $('.color_bar_7').on("click", function(e) {
   
    $(".gradi_storyline").css("background",'linear-gradient(-45deg, #f7f7ff,#d6d2ff,#a29bfe)').trigger("create");
	//new_color = '#a29bfe';
   // $('.gradi_storyline').html(data).trigger("create");
    //console.log(new_color);
	e.preventDefault();

  });

  
  $('.color_bar_8').on("click", function(e) {
   
    $(".gradi_storyline").css("background",'linear-gradient(-45deg, #fcfcff,#aea3ff,#6c5ce7)').trigger("create");
  //  $('.gradi_storyline').html(data).trigger("create");
	//new_color = '#6c5ce7';
	//console.log(new_color);
    e.preventDefault();

  });

  
  $('.color_bar_9').on("click", function(e) {
   
    $(".gradi_storyline").css("background",'linear-gradient(-45deg, #ebfaff,#aec1c8,#636e72)').trigger("create");
   // $('.gradi_storyline').html(data).trigger("create");
	//new_color = '#636e72';
	//console.log(new_color);
    e.preventDefault();

  });


}); 
// 이거 색상 바꿔도 css 동적으로 refresh 해줘야 들어감 
// 그냥 하면 단적인 색만  제목에 표시되고 끝이라서..













// 포토 그리드 부분


$(document).ready(function(){






  var $upload_grid = $('.upload_grid_zone').masonry({
    itemSelector: '.upload_grid',
    columnWidth: 10

  });
  

  $upload_grid.on( 'click', '.upload_grid', function( event ) {



    $('.add_upload_grid').attr('disabled',false);
    $('.add_upload_grid').css('background','url("/static/img/plus_button.png" ) no-repeat;');

   // $upload_grid.masonry( 'remove', event.currentTarget )

     // .masonry();
  });
  // 그리드 누르면 삭제 기능


 
  // upload_count는 현재 그리드 개수를 세서 10개 초과되면 버튼 비활성화 하게 하는 용이고,
  // upload_numbering은 새로 생성된 그리드 뒤에 붙일 넘버링용 변수, upload_count 변수를 뒤에 붙여버리면 숫자가 겹치는 경우가 발생해버림

  upload_count = $(".upload_grid").length 


  // 업로드 그리드 생성 부분
var upload_numbering=10;
    var onoff_numbering=0;
  $('.openWindow').on( 'click', function() {
       
// if(onoff_numbering==0){
//      // 사진 업로드 갯수는 최대 10개니까 제한걸기 , 누를때마다 단순 증가숫자를 카운트만 하는게 아니라 그리드 삭제할 경우도 생각해야 해서.. 음..
// for(var i =0;i<1;i++)
// {
//     onoff_numbering++;
//   upload_numbering--;
      $('.add_upload_grid').attr('disabled',false);
      upload_count = $(".upload_grid").length 


    var upload_elems = [ getItemElement()];
    var $upload_elems = $( upload_elems );

    $upload_grid.prepend( $upload_elems ).masonry( 'prepended', $upload_elems );
// }
// }
  });



  function getItemElement() {
    var plus_img= '<img id = "plus_icon" src="/static/img/plus.png">'; // 이거 이런식으로 객체 생성해서 append 하면 안들어감


    var upload_elem = document.createElement('div');
    var img_tag = document.createElement('img');


    img_tag.setAttribute('id','plus_icon');
    img_tag.setAttribute('src',"/static/img/plus.png"); // DOM 객체로 접근해서 생성해야 로드됨
    

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

      grid_selector = $(this).index();




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
};

// 파일 멀티 업로드 Callback
function F_FileMultiUpload_Callback(files) {
  for(var i=0; i < files.length; i++)
      console.log(files[i].file_nm + " - " + files[i].file_size);
}