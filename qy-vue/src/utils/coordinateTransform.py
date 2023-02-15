import math
import cv2

def wgs842WebMercator(lon, lat):
    x = lon * 20037508.34 / 180
    y = math.log(math.tan((90 + lat)*math.pi/360)) / (math.pi/180)
    y = y * 20037508.34 / 180
    return x, y


def WebMercator2wgs84(x, y):
    lon = x / 20037508.34 * 180
    lat = y / 20037508.34 * 180
    lat = 180/math.pi * (2*math.atan(math.exp(lat * math.pi/180)) - math.pi/2)
    return lon, lat


def lonlat2imgxy(lon, lat, bg_w, bg_h):
    leftdown_x, leftdown_y = 3339581.717707082, -3801210.7060358087
    rightup_x, rightup_y = 20482786.30311111, 6739983.839878104
    x, y = wgs842WebMercator(lon, lat)
    img_x = int((x - leftdown_x) / (rightup_x - leftdown_x) * bg_w)
    img_y =  int(bg_h - (y - leftdown_y) / (rightup_y - leftdown_y) * bg_h)
    return img_x, img_y


def imgxy2lonlat(img_x, img_y, bg_w, bg_h):
    leftdown_x, leftdown_y = 3339581.717707082, -3801210.7060358087
    rightup_x, rightup_y = 20482786.30311111, 6739983.839878104
    x = leftdown_x + img_x / bg_w * (rightup_x-leftdown_x)
    y = leftdown_y + (bg_h-img_y) / bg_h * (rightup_y-leftdown_y)
    lon, lat = WebMercator2wgs84(x, y)
    return lon, lat



if __name__ == '__main__':

    ### basic information of background range
    leftdown_x, leftdown_y = 3339581.717707082, -3801210.7060358087
    leftdown_lon, leftdown_lat = 29.999973, -32.288273 
    rightup_x, rightup_y = 20482786.30311111, 6739983.839878104
    rightup_lon, rightup_lat = 184, 51.666145
  
    ### test the transform between the coordinate of background image and lon-lat
    # bg = cv2.imread("/dssg/liguan/zyh/Frontier/data/bg-test.png")
    # bg_w, bg_h = bg.shape[1], bg.shape[0]
    # taiwan_lon, taiwan_lat = 121, 23.5
    # taiwan_in_img_x, taiwan_in_img_y = lonlat2imgxy(taiwan_lon, taiwan_lat, bg_w, bg_h)
    # taiwan_lon, taiwan_lat = imgxy2lonlat(taiwan_in_img_x, taiwan_in_img_y, bg_w, bg_h)
    # bg[taiwan_in_img_y, taiwan_in_img_x] = [0, 0, 0]
    # cv2.imwrite("/dssg/liguan/zyh/Frontier/data/bg-test.png", bg)
    