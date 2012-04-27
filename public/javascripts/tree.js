var labelType,
useGradients,
nativeTextSupport,
animate,
st;

 (function() {
    var ua = navigator.userAgent,
    iStuff = ua.match(/iPhone/i) || ua.match(/iPad/i),
    typeOfCanvas = typeof HTMLCanvasElement,
    nativeCanvasSupport = (typeOfCanvas == 'object' || typeOfCanvas == 'function'),
    textSupport = nativeCanvasSupport
    && (typeof document.createElement('canvas').getContext('2d').fillText == 'function');
    //I'm setting this based on the fact that ExCanvas provides text support for IE
    //and that as of today iPhone/iPad current text support is lame
    labelType = (!nativeCanvasSupport || (textSupport && !iStuff)) ? 'Native': 'HTML';
    nativeTextSupport = labelType == 'Native';
    useGradients = nativeCanvasSupport;
    animate = !(iStuff || !nativeCanvasSupport);
})();

function drawRect(ctx, x, y, w, h, r) {
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
}

function initTreeView(json, canvas_height, element, xOffset) {
    st = new $jit.ST({
        injectInto: element,
        width: 980,
        height: canvas_height,
        offsetX: xOffset,
        offsetY: 20,
        duration: 300,
        levelDistance: 50,
        constrained: true,
        levelsToShow: 3,
        Node: {
            overridable: true,
            height: 40,
            width: 150,
            type: 'roundrect',
            color: '#FF7F24'
        },
        Edge: {
            type: 'bezier',
            overridable: true,
            color: '#AAB3CB',
            lineWidth: 1,
            dim: 30
        },
        onCreateLabel: function(label, node) {
            label.id = node.id;
            label.innerHTML = node.name;
            label.onclick = function() {
                st.onClick(node.id);
            };
            //set label styles
            var style = label.style;
            style.width = 205 + 'px';
            style.height = 20 + 'px';
            style.cursor = 'pointer';
            style.color = '#FFF';
            style.fontSize = '13px';
            style.fontWeight = 'bold';
            style.textAlign = 'left';
            style.paddingTop = '3px';
            style.paddingLeft = '5px';
            style.display = 'block';
        },
        onBeforePlotLine: function(adj) {
            if (adj.nodeFrom.selected && adj.nodeTo.selected) {
                } else {
                delete adj.data.$color;
                delete adj.data.$lineWidth;
            }
        },
        Events: {
            enable: true,
            onClick: function(){return false}
        }
    });

    //create a rounded corner node
    $jit.ST.Plot.NodeTypes.implement({
        'roundrect': {
            'render': function(node, canvas, animating) {
                var pos = node.pos.getc(true),
                nconfig = this.node,
                data = node.data;
                var ort;
                var width = nconfig.width,
                height = nconfig.height;
                var algnPos = this.getAlignedPos(pos, width, height);
                var ctx = canvas.getCtx();
                ort = this.config.orientation;
                ctx.beginPath();
                var r = 5;
                //corner radius
                var x = algnPos.x;
                var y = algnPos.y;
                var h = 25;
                var w = width;
                drawRect(ctx, x, y, w, h, r);
                ctx.fillStyle = ('#9B9');
                ctx.fill();
            }
        }
    });
    //load json data
    st.loadJSON(json);
    //compute node positions and layout
    st.compute();
    //optional: make a translation of the tree
    st.geom.translate(new $jit.Complex( - 200, 0), "current");
    //emulate a click on the root node.
    st.onClick(st.root);
    //end
}