function tabelka() {
    $.getJSON('https://my.api.mockaroo.com/kino.json?key=40cbedd0', function(data) {
      var table = $('<table></table>');
      $('body').append(table);
  
      var headers = Object.keys(data[0]);
      var headerRow = $('<tr></tr>');
      headers.forEach(function(header) {
        var th = $('<th></th>');
        th.text(header);
        headerRow.append(th);
      });
      table.append(headerRow);
 
      data.forEach(function(rowData) {
        var row = $('<tr></tr>');
        headers.forEach(function(header) {
          var td = $('<td></td>');
          td.text(rowData[header]);
          row.append(td);
        });
        table.append(row);
      });
    });
  }