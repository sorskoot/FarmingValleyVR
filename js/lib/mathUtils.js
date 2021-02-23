const mathUtils = {
    lerp: function (start, end, amt) {
        return (1 - amt) * start + amt * end;
    }
}