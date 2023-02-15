function wgs842WebMercator(lon, lat) {
    let x = lon * 20037508.34 / 180
    let y = Math.log(Math.tan((90 + lat) * Math.PI / 360)) / (Math.PI / 180)
    y = y * 20037508.34 / 180
    return [x, y]
}


function WebMercator2wgs84(x, y) {
    let lon = x / 20037508.34 * 180
    let lat = y / 20037508.34 * 180
    lat = 180 / Math.PI * (2 * Math.atan(Math.exp(lat * Math.PI / 180)) - Math.PI / 2)
    return [lon, lat];
}


function lonlat2imgxy(lon, lat, bg_w, bg_h) {
    let leftdown_x = 3339581.717707082;
    let leftdown_y = -3801210.7060358087;
    let rightup_x = 20482786.30311111;
    let rightup_y = 6739983.839878104;

    let x, y;
    [x, y] = wgs842WebMercator(lon, lat)

    let img_x = Math.floor((x - leftdown_x) / (rightup_x - leftdown_x) * bg_w)
    let img_y = Math.floor(bg_h - (y - leftdown_y) / (rightup_y - leftdown_y) * bg_h)
    return [img_x, img_y]
}


function imgxy2lonlat(img_x, img_y, bg_w, bg_h) {
    let leftdown_x = 3339581.717707082;
    let leftdown_y = -3801210.7060358087;
    let rightup_x = 20482786.30311111;
    let rightup_y = 6739983.839878104;
    let x = leftdown_x + img_x / bg_w * (rightup_x - leftdown_x)
    let y = leftdown_y + (bg_h - img_y) / bg_h * (rightup_y - leftdown_y);
    let lon, lat;
    [lon, lat] = WebMercator2wgs84(x, y);
    return [lon, lat]
}

export {lonlat2imgxy, imgxy2lonlat}