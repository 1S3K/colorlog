  /* my page 탭 메뉴 애니메이션 부분 시작 */ 

$(function () {

    $(".tab_content").hide();
    $(".tab_content:first").show();
  
    $("ul.tabs li").click(function () {
        $("ul.tabs li").removeClass("active").css("color", "#333");
  
        $(this).addClass("active").css("color", "darkred");
        $(".tab_content").hide()
        var activeTab = $(this).attr("rel");
  
        $("#" + activeTab).fadeIn()
    });







  });
  
  /* my page 탭 메뉴 애니메이션 부분 끝 */ 

  /* region_window ,  지역선택 탭 메뉴 애니메이션 부분 시작 */ 
  
  
$(function () {



    // $(".region_tab_content").hide();
    // $(".region_tab_content:first").show();

	$('ul.region_tabs li').click(function(){
		var tab_id = $(this).attr('data-tab');
		
		$('ul.region_tabs li').removeClass('current');
		$('.tab-content').removeClass('current');

		$(this).addClass('current');
		$("#"+tab_id).addClass('current');
	})

	
    
  });
  
  
/* region_window ,  지역선택 탭 메뉴 애니메이션 부분 끝 */ 

/* region_window ,  지역 누르면 입력창에 텍스트 넣어주기 시작*/ 
// $(function () {




// 	$('ul.region_list li button').click(function(){
       
//         $('#region_window').bPopup().close();
//         var region_name = $(this).attr('data');
//         var region_code =$(this).attr('id');
      
         
//         $("#place_title_mini").attr('value',region_name);
//         $('#city_selector').html(region_name);
//         $('path').not('path.island').attr('fill',"#B9B9B9"); // 전체 회색으로 칠하고 
//         $('path[region-id='+region_code+']').attr('fill','#c7bf4b');


    
		
// 	})


    
//   });

/* region_window ,  지역 누르면 입력창에 텍스트 넣어주기 끝*/ 



/* 달력 팝업 시작*/ 

$(function () {


    $("#date1").datepicker();
    $("#date2").datepicker();
    


    
  });

/* 달력 팝업 끝*/ 

var view_screen ='';

(function($) {
    $(function() {






          $('.view_button').on("click", function(e) {
  
         


              view_screen =  $('#VIEW_STORY').bPopup({

                   modalClose : true
               });
            });    
     });
})(jQuery)



/*  지역 선택창 시작 */
var region_select_window='';
(function($) {
    $(function() {





          $('.openRegion').on("click", function(e) {
  
           

              howto_window =  $('.region_window').bPopup({

                   modalClose : true
               });
            });    
          $('.place_title_selector').on("click", function(e) {
  

          

              howto_window =  $('.region_window2').bPopup({

                   modalClose : true
               });
            });    
     });
})(jQuery)
/*  지역 선택창 끝 */

