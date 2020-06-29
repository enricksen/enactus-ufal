const getTextData = async () => {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json'}
  };

  const response = await fetch('https://enactusufal-admin.herokuapp.com/api/texts/', requestOptions);

  return await response.json();

};

const getImageData = async () => {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json'}
  };

  const response = await fetch('https://enactusufal-admin.herokuapp.com/api/images/', requestOptions);

  return await response.json();

};

const getProjectData = async () => {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json'}
  };

  const response = await fetch('https://enactusufal-admin.herokuapp.com/api/projetos/', requestOptions);

  return await response.json();

};

const getPartnerData = async () => {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json'}
  };

  const response = await fetch('https://enactusufal-admin.herokuapp.com/api/parceiros/', requestOptions);

  return await response.json();
};

const showAbout = async (textos, imagens) => {

  if(textos.length !== 0) {
    const about_text = textos.filter((text) => {
      return text.title === 'O que Fazemos'
    });
    if(about_text.length !== 0) {
      $("#about-dinamic-text").append(""+about_text[0].text);
    }
  }

  if(imagens.length !== 0) {
    const about_img = imagens.filter((image) => {
      return image.title === 'Sobre'
    });
    if(about_img.length !== 0) {
      $("#about-dinamic-img").attr("src",""+about_img[0].url);
    }
  }
};

const showProject = async (projetos) => {
  var promises = projetos.map(async (projeto) => {
    $("#dinamic-project-container").append("<div class='modal fade' id='"+projeto.idProject+"' tabindex='-1' role='dialog' aria-labelledby='exampleModalLongTitle' aria-hidden='true'></div>");
    $("#"+projeto.idProject).append('<div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-title"><span style="color: '+projeto.main_color+'!important" class="projectName">'+projeto.title.toUpperCase()+'</span></div><div class="modal-about"><div class="modal-text"><span class="projectAbout">SOBRE O PROJETO</span><p>'+projeto.about+'</p></div><div class="modal-logo"><img src="'+projeto.logo_url+'" /></div></div><div><div><div class="row" id="counterProject"></div><svg style="fill:'+projeto.main_color+'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4769.05 1755.27"><defs></defs><g id="Camada_2" data-name="Camada 2"><g id="Camada_1-2" data-name="Camada 1"><path class="cls-1" d="M4769.05,1310V13.45C4216.38,202.68,3767.11,234.54,3461.3,228.6c-254.83-4.94-517.27-38.2-722.82-64.25C2321.79,111.53,2150.81,62.22,1736.23,26.49,1609.64,15.58,1427.53-.12,1225.79,0,941,.17,518.17,31.9,0,190.43V1755.27c151.3-71.55,366.5-168.71,629.66-272,288.26-113.12,614.54-241.17,941.9-317.35,0,0,897.39-208.85,2147.42,48.73,69.11,14.24,290,62,591.89,84.69A4424.57,4424.57,0,0,0,4769.05,1310Z"/></g></g></svg></div><div class="galery"><span class="projectAbout">GALERIA</span><div id="carouselProject" class="carousel slide" data-ride="carousel"><div class="carousel-inner"></div></div></div></div>');
    $("#dinamic-project-container").append("<div class='mb-4 col-lg-4 col-md-6 col-sm-12 col-xs-4'><div class='hovereffect'  data-toggle='modal' data-target='#"+projeto.idProject+"' color='"+projeto.main_color+"' style='background-color: "+projeto.main_color+"!important'><img class='img-responsive' src='"+projeto.main_photo+"' alt=''><div class='overlay'><img class='project-logo' src='"+projeto.whitelogo_url+"'/></div></div></div>");
    var metricas = projeto.metrics.split(":");
    var metricas_promises = metricas.map(async (metrica) => {
      var metrica_valores = metrica.split("-");
      $("#"+projeto.idProject+" #counterProject").append('<div class="col-sm-4 counter-Txt"> '+metrica_valores[0]+' <span class="counter-value">'+metrica_valores[1]+'</span> '+metrica_valores[2]+'</div>')
    });
    await Promise.all(metricas_promises);
    var gallery_photos = projeto.gallery.split("@");
    var gallery_promises = gallery_photos.map(async (photo, index) => {
      if(index === 0) {
        $("#"+projeto.idProject+" #carouselProject .carousel-inner").append('<div class="carousel-item active"><img class="d-block w-100" src="'+photo+'"></div>')
      } else {
        $("#"+projeto.idProject+" #carouselProject .carousel-inner").append('<div class="carousel-item"><img class="d-block w-100" src="'+photo+'"></div>')
      }
    });
    await Promise.all(gallery_promises);
  });
  await Promise.all(promises);

};

const showNumbers = async (textos) => {
  if(textos.length !== 0) {
    var metricas_gerais = textos.filter((texto) => {
      return texto.title === "Metricas Gerais"
    });
    if(metricas_gerais.length !== 0) {
      console.log(metricas_gerais)
      var metricas_gerais = metricas_gerais[0].text.split(":");
      var metricas_promises = metricas_gerais.map(async (metrica) => {
        var metrica_valores = metrica.split("-");
        $("#numeros #counter").append('<div class="col-sm-4 counter-Txt"> '+metrica_valores[0]+' <span class="counter-value">'+metrica_valores[1]+'</span> '+metrica_valores[2]+'</div>')
      });
    }
  }
};

const showPartners = async (parceiros) => {
  if(parceiros.length !== 0) {
    var parceiros_promises = parceiros.map(async (parceiro) => {
      $("#partner_dinamic_container").append('<div class="slide"><img src="'+parceiro.url+'"></div>')
    });
  }
};


$(window).scroll(function (event) {
var scroll = $(window).scrollTop();

  if(scroll > 0 ) {
    $("nav").addClass("navbar-enactus-down");
    $("#logo1").addClass("hidden");
    $("#logo2").removeClass("hidden");
  } else {
    $("nav").removeClass("navbar-enactus-down");
    $("#logo2").addClass("hidden");
    $("#logo1").removeClass("hidden");
  }
});

$(document).ready(async () => {
  const textos = await getTextData();
  const imagens = await getImageData();
  const projetos = await getProjectData();
  const parceiros = await getPartnerData();
  showAbout(textos,imagens);
  showProject(projetos);
  showNumbers(textos);
  showPartners(parceiros);

  $('.carousel').carousel({
    interval: 5000,
    ride: 'carousel'
  });
  $('[data-toggle="popover"]').popover();
  $('.customer-logos').slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 1900,
      arrows: false,
      dots: false,
      pauseOnHover: true,
      responsive: [{
          breakpoint: 768,
          settings: {
              slidesToShow: 3
          }
      }, {
          breakpoint: 520,
          settings: {
              slidesToShow: 2
          }
      }]
  });
});
