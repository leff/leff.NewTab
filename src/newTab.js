(function() {

  $(function(){
    init();
    render();
    window.setInterval(render, 1000);
  });

  var domNodes = [],
    config = {
    clocks: [
      {
        name: 'Los Angeles',
        timezone: 'America/Los_Angeles',
        image: {
          url: 'http://cdn.abclocal.go.com/three/kabc/webcam/web2-1.jpg',
          update: true
        }
      },
      {
        name: 'Chicago',
        timezone: 'America/Chicago',
        image: {
          url: 'http://cdn.abclocal.go.com/three/wls/webcam/Riverwalk.jpg',
          update: true
        }
      }
    ]
  };

  function init() {
    $('.clock').each(function(clock){
      var c = $(this),
          nodes = {
            top: c,
            image: c.find('.image'),
            timezone: c.find('.timezone'),
            timeHM: c.find('.time-hm'),
            timeSA: c.find('.time-sa'),
            date: c.find('.date')
          };
      

      // create seconds
      for(var i=0; i<60; i++) {
        nodes.timeSA.append('<span class="second second-'+(i+1)+'" data-second="'+(i+1)+'"></span>');
      }
      nodes.seconds = nodes.timeSA.find('.second');

      domNodes.push(nodes);
    });
  }

  
  function updateClock(nodeObj, index, array) {
    var conf = config.clocks[index];
    var now = moment.tz(conf.timezone);

    nodeObj.image.css("background-image", "url("+conf.image.url+")");
    nodeObj.timezone.html(conf.name);
    nodeObj.timeHM.html(now.format('h:mm'));
    nodeObj.date.html(now.format('Do MMMM, YYYY'));

    var sec = parseInt(now.format('s'),10);
    if( sec == 0 ) {
      nodeObj.seconds.removeClass('is-on');
    }
    for(var i=0; i<=sec; i++) {
      $(nodeObj.seconds[i]).addClass('is-on');
    }
  }

  function render() {
    domNodes.forEach(updateClock);
  }
  
})();