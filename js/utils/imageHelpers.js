export const imageHelpers = {
    getPixel: function (imgData, index) {
        var i = index * 4, d = imgData.data;
        return [d[i], d[i + 1], d[i + 2], d[i + 3]] // Returns array [R,G,B,A]
    },

    // AND/OR

    getPixelXY: function (imgData, x, y) {
        return imageHelpers.getPixel(imgData, y * imgData.width + x);
    },

    setPixel: function (imgData, index, r,g,b,a) {
        var i = index * 4, d = imgData.data;
        d[i]=r;
        d[i + 1]=g;
        d[i + 2]=b;
        d[i + 3]=a;
    },

    setPixelXY: function (imgData, x, y, r,g,b,a) {
        imageHelpers.setPixel(imgData, y * imgData.width + x, r,g,b,a);
    },
}