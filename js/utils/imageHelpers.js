const imageHelpers = {
    getPixel: function (imgData, index) {
        var i = index * 4, d = imgData.data;
        return [d[i], d[i + 1], d[i + 2], d[i + 3]] // Returns array [R,G,B,A]
    },

    // AND/OR

    getPixelXY: function (imgData, x, y) {
        return imageHelpers.getPixel(imgData, y * imgData.width + x);
    }
}