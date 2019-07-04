$(function () {

  $(document).on("click", ".material-card > .mc-btn-action", function () {
    var card = $(this).parent(".material-card");
    var icon = $(this).children("i");
    icon.addClass("fa-spin-fast");

    if (card.hasClass("mc-active")) {
      card.removeClass("mc-active");

      window.setTimeout(function () {
        icon
          .removeClass("fa-arrow-left")
          .removeClass("fa-spin-fast")
          .addClass("fa-bars");
      }, 800);
    } else {
      card.addClass("mc-active");

      window.setTimeout(function () {
        icon
          .removeClass("fa-bars")
          .removeClass("fa-spin-fast")
          .addClass("fa-arrow-left");
      }, 800);
    }
  });

  animeList();

  jQuery.ajax("https://api.jikan.moe/v3/top/anime/1/upcoming", {
    success: function (data, state) {
      var txt = "<ul class='list-group'>";
      for (let index = 0; index < 10; index++) {
        txt += buildUpcomingElement(data.top[index]);

      }

      txt += " </ul>"

      jQuery("#list").html(txt);
    },
    error: function () {
      console.log("error");
    }
  });

  $("#Search").click(function () {

    var txtSearch = $("#txtSearch").val().trim().replace(" ","%20");
    var urlS = "https://api.jikan.moe/v3/search/anime?q=" + txtSearch ;
    jQuery.ajax(urlS, {
      success: function (data, state) {

        var pics = "";
      for (let index = 0; index < data.results.length; index++) {
          pics+= buildAnimeElement(data.results[index]);
    
       }
      jQuery("#cards").html(pics);
      $('.lazy').lazy();

      },
      error: function () {

        console.log("error");
      }
    });

  });

  $(document).on("click", ".btn-popup", function () {
    var animeId = $(this).attr("data-anime-id");
    var animeTitle = $(this).attr("data-anime-title");
    

    jQuery.ajax("https://api.jikan.moe/v3/anime/"+animeId, {
      success: function (data, state) {

        var html = buildDetail(data);
        jQuery("#exampleModalLabel").text(animeTitle);
        jQuery("#myTabContent").html(html);
        jQuery("#exampleModal").modal('show');

      },
      error: function () {
        console.log("error");
      }
    });
  
  });

  $(document).on("click", ".btn-genre", function () {

    
  var genreId = $(this).attr("data-genre-id");
    var urlS = "https://api.jikan.moe/v3/genre/anime/" + genreId ;
    jQuery.ajax(urlS, {
      success: function (data, state) {

        var pics = "";
      for (let index = 0; index < data.anime.length; index++) {
          pics+= buildAnimeElement(data.anime[index]);
    
       }
      jQuery("#cards").html(pics);
      $('.lazy').lazy();

      },
      error: function () {

        console.log("error");
      }
    });
  
  
  });

  $(".navbar-brand").click(function () {

    animeList();

  });

});

buildAnimeElement = function (element) {

  var title =  element.title;
  if (title.length > 19)
      title  =  element.title.substr(0, 19) + "...";

  var date = "";
  if  ( element.start_date != null && element.end_date != null )
    date = "<strong> " + element.start_date + " - " + element.end_date + "</strong>";

  var   html = 
        "<div class='col-md-3 col-sm-6 col-xs-12'>"
        + "<article class='material-card Red'>"
            + "<h2 title='" + element.title + "'>"
                + "<span>" + title + "</span>"
                + date
            + "</h2>"
            + "<div class='mc-content'>"
                + "<div class='img-container'>"
                    + "<img class='lazy img-responsive btn-block' data-src='" + element.image_url + "' />"
                + "</div>"
              + "<div class='mc-description'>" + element.title + "</div>"
            + "</div>"
            + "<a class='mc-btn-action'> <i class='fa fa-bars'></i> </a>"
            + "<div class='mc-footer'>"
              +'<button type="button" class="btn btn-danger btn-popup" data-anime-title="'+element.title+'" data-anime-id="'+element.mal_id+'" data-toggle="modal" >'
              +"Details"
              +'</button>'
            + " </div>"
        + "</article>"
      + "</div>";
  return html ;
}
buildUpcomingElement = function(el)
{
  var html = "";
  html += "<li class='list-group-item d-flex justify-content-between align-items-center'>" + el.title;
  var cssClass = "badge-light";

  if (el.rank == 1) 
    cssClass = "badge-danger";
  else if (el.rank == 2) 
    cssClass = "badge-warning" ;
  else if (el.rank == 3) 
    cssClass = "badge-success" ;

  html += "<span class='badge badge-pill " + cssClass + "'>" + el.rank + "</span>"
        + "</li>"
  return html ;
}

buildDetail = function(data){

  var html = "";
  html =    '<div class="tab-pane fade show active" id="details" role="tabpanel" aria-labelledby="details-tab">'
              +'<div class="container">'
                +'<table class="table table-sm table-borderless">'
                  +'<tbody>'
                    +'<tr>'
                      +'<th  scope="row">rank</th>'
                      +'<td>'+data.rank+'</td>'
                    +'</tr>'
                    +'<tr>'
                        +'<th scope="row">title_english</th>'
                        +'<td>'+data.title_english+'</td>'
                      +'</tr>'
                    +'<tr>'
                      +'<th scope="row">title_japanese</th>'
                      +'<td>'+data.title_japanese+'</td>'
                    +'</tr>'
                    +'<tr>'
                      +'<th scope="row">episodes</th>'
                      +'<td >'+data.episodes+'</td>'
                    +'</tr>'
                    +'<tr>'
                      +'<th scope="row">status</th>'
                      +'<td >'+data.status+'</td>'
                    +'</tr>'
                    +'<tr>'
                      +'<th scope="row">aired </th>'
                      +'<td >'+data.aired.from.substr(0, 10)+ ' / '+data.aired.to.substr(0, 10)+'</td>'
                    +'</tr>'
                    +'<tr>'
                      +'<th scope="row">duration</th>'
                      +'<td >'+data.duration+'</td>'
                    +'</tr>'
                    +'<tr>'
                      +'<th scope="row">rating</th>'
                      +'<td >'+data.rating+'</td>'
                    +'</tr>'
                    +'<tr>'
                      +'<th scope="row">genres</th>'
                      +'<td >'
                      for (let index = 0; index < data.genres.length - 1 ; index++) {

                        html += ' <button type="button" class="btn-genre btn btn-primary btn-sm" role="button" data-genre-id="'+data.genres[index].mal_id+'" >'+data.genres[index].name +'</button> '
                      }
                      html +='</td>'
                    +'</tr>'
                  +'</tbody>'
                +'</table>'
              +'</div>'

            +'</div>'
            +'<div class="tab-pane fade" id="resume" role="tabpanel" aria-labelledby="resume-tab">'
            +data.synopsis
            +'</div>'
            +'<div class="tab-pane fade" id="trailer" role="tabpanel" aria-labelledby="trailer-tab">'
              +'<div class="modal-body">'
                +'<iframe width="400" id="video" height="200" frameborder="0" style="width: -webkit-fill-available;" src="'+data.trailer_url+'"></iframe>'
              +'</div>'
            +'</div>'
            /*+'<div class="tab-pane fade" id="pictures" role="tabpanel" aria-labelledby="pictures-tab">'

                +'<div id="carouselExampleControls" class="carousel slide" data-ride="carousel">'
                  +'<div class="carousel-inner">'

                    +'<div class="carousel-item active">'
                        +'<img src="'+data.image_url+'" class="d-block w-100" alt="...">'
                    +'</div>'
                    +'<div class="carousel-item ">'
                        +'<img src="'+data.image_url+'" class="d-block w-100" alt="...">'
                    +'</div>'
                      
                      jQuery.ajax("https://api.jikan.moe/v3/anime/"+data.mal_id+"/pictures", {
                      success: function (data, state) {
                        for (let index = 0; index < data.pictures.length; index++) {

                            console.log(data.pictures[index].large);
                            console.log('<div class="carousel-item ">'
                            +'<img src="'+ data.pictures[index].large+'" class="d-block w-100" alt="...">'
                            +'</div>');

                        html +='<div class="carousel-item ">'
                                +'<img src="'+ data.pictures[index].large+'" class="d-block w-100" alt="...">'
                                +'</div>'
                          
                        }
                      },
                      error: function () {
                        console.log("error");
                      }
                    });
                    +'<a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">'
                      +'<span class="carousel-control-prev-icon" aria-hidden="true"></span>'
                      +'<span class="sr-only">Previous</span>'
                    +'</a>'
                    +'<a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">'
                      +'<span class="carousel-control-next-icon" aria-hidden="true"></span>'
                      +'<span class="sr-only">Next</span>'
                    +'</a>'
                    
                  +'</div>'
                +'</div>'

            +'</div>'*/
     return html ;
}

animeList = function()
{
  jQuery.ajax("https://api.jikan.moe/v3/top/anime/1", {
    success: function (data, state) {
      var pics = "";
      for (let index = 0; index < data.top.length; index++) {
          pics+= buildAnimeElement(data.top[index]);
    
       }
      jQuery("#cards").html(pics);
      $('.lazy').lazy();
    },
    error: function () {
      console.log("error");
    }
  });
}
