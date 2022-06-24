// let solution = (n, width, height) => {

module.exports = function(n, width, height) {
    const k = width / height; // коэффициент соотношения высоты и ширины экрана
    let videos = [];
    let rowQty = null;
    let offsetY = 0;
    let offsetX = 0;

    let columnQty = Math.ceil(Math.sqrt(n));        
    const blockWidth = width / columnQty;        
    const blockHeight = blockWidth / k;
    
    // определение количества рядов
    if (n <= (Math.pow(columnQty, 2) - columnQty)) { // количество заполненных рядов меньше количества колонок, нужен отступ по высоте
        rowQty = columnQty - 1;       
        offsetY = blockHeight / 2; // Отступ сверху и снизу: высота блока / 2
    } else { // количество заполненных рядов равно количеству колонок, заполняется вся высота
        rowQty = columnQty;
    }

    let position = {
        x:  null,
        y: height - offsetY
    };

    let fillRow = (counter, offset) => {
        position.x = width - offset;
        position.y = Math.round(position.y - blockHeight);
        for(let i = counter; i > 0; i--) {
            position.x = Math.round(position.x - blockWidth);
            if (position.y < 0) {
                position.y = 0;
            }
            if (position.x < 0) {
                position.x = 0;
            }
            videos.unshift({
                width: Math.round(blockWidth),
                height: Math.round(blockHeight),
                x: position.x,
                y: position.y
            });
        }
    }

    // заполнение всех рядов кроме первого
    while(rowQty != 1) {
        fillRow(columnQty, offsetX);
        rowQty--;
    }

    // заполнение первого ряда
    let restBlocks = n % columnQty;
    if (restBlocks != 0) {
        offsetX = (width - restBlocks * blockWidth) / 2; // отступ слева и справа для первого ряда
        fillRow(restBlocks, offsetX);
    } else  {
        fillRow(columnQty, offsetX);
    }
    
    return videos;
}