$(function(){
  // ask the server for songs, and then draw them
  getSongs();

  // listen for submit events and send new songs to the server
  $('form').on('submit', function(event){
    event.preventDefault();
    var formData = $(this).serialize();
    $.ajax({
      type: 'POST',
      url: '/songs',
      data: formData,
      success: getSongs,
      statusCode: {
        400: function (){
          alert('Please fill out song title and artist');
        },
        409: function(){
          alert('Song and Title entered already exist in our database. Please pick another song!');
        }
      }
    });

    $(this).find('input[type=text]').val('');
  });
});

function getSongs() {
  $.ajax({
    type: 'GET',
    url: '/songs',
    success: function(songs){
      $('#songs').empty();
      songs.forEach(function(song){
        var $li = $('<li class=""></li>');
        $li.append('<p>"'+ song.title + '"</p>');
        $li.append('<p>by: '+ song.artist + '</p>');
        $li.append('<p>Added on: '+ song.dateAdded + '</p>');
        $('#songs').append($li);
      });

    }


  });
}
