$('.carousel').carousel({
    // Intervalo de mudança do slide do banner 1000 = 1s
    interval: 3000
});

//Função que faz quando rolar o scroll deixar o nav branco e agarrado no top

$(document).on('scroll', function () {
    if ($(window).scrollTop() > 200) {
        $('.navbar').css('margin-top', '0');
        $('.navbar').css('background-color', 'rgba(255,255,255,1)');
        $('.navbar').css('border-bottom', '2px solid #000');
    } else {
        $('.navbar').css('margin-top', '1.5%');
        $('.navbar').css('background-color', 'rgba(255,255,255,.3)');
        $('.navbar').css('border-bottom', 'none');
    }
});

//Função que faz o filtro de divs da página PATISSERIE

$(document).ready(function () {
    $('.parisseries-item-cinnamons').hide();
    $('.parisseries-item-paodemel').hide();
    $('.parisseries-item-macaron').show();
});

$('.btn.bf').on("click", function () {
    window.dispatchEvent(new Event('resize'));
});

$('#bt_macaron').on("click", function () {
    $('.parisseries-item-cinnamons').hide();
    $('.parisseries-item-paodemel').hide();
    $('.parisseries-item-macaron').show();
});
$('#bt_cinnamons').on("click", function () {
    $('.parisseries-item-macaron').hide();
    $('.parisseries-item-paodemel').hide();
    $('.parisseries-item-cinnamons').show();
});
$('#bt_paodemel').on("click", function () {
    $('.parisseries-item-cinnamons').hide();
    $('.parisseries-item-macaron').hide();
    $('.parisseries-item-paodemel').show();
});


/*
	Basic Image slider
	Copyright 2017-10-19 Jake Nicholson 
	
	This is free and unencumbered software released into the public domain.

	Anyone is free to copy, modify, publish, use, compile, sell, or
	distribute this software, either in source code form or as a compiled
	binary, for any purpose, commercial or non-commercial, and by any
	means.
	
	In jurisdictions that recognize copyright laws, the author or authors
	of this software dedicate any and all copyright interest in the
	software to the public domain. We make this dedication for the benefit
	of the public at large and to the detriment of our heirs and
	successors. We intend this dedication to be an overt act of
	relinquishment in perpetuity of all present and future rights to this
	software under copyright law.
	
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
	IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
	OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
	ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
	OTHER DEALINGS IN THE SOFTWARE.
	
	For more information, please refer to <http://unlicense.org/>
	
	What's new in this version?
	 - Death to jQuery
	 	
*/

// CONFIGS PLUGIN CAROUSEL

var MagicCarousel;
MagicCarousel = function (Selector, UserOptions) {

    var _ = this;

    _.ResizeTimeout = null;
    _.AnimationTimeout = null;
    _.Root = null;

    _.Options = {
        Arrows: {
            Left: '/media/common/arrow-left.png',
            Right: '/media/common/arrow-right.png'
        },
        Layout: {
            Columns: 1,
            MaxWidth: 1920,
            MinWidth: 320
        },
        Movement: {
            Auto: true,
            Velocity: 0.5,
            /* px/ms */
            Pause: 4000,
            /* ms */
        }
    };

    _.ArrayIndex = function (Needle, HayStack) {
        return HayStack.indexOf(Needle);
    };

    _.InArray = function (Needle, HayStack) {
        return _.ArrayIndex(Needle, HayStack) > -1;
    };

    _.HasValue = function (Var) {
        if (typeof (Var) === 'undefined') {
            return false;
        } else if (Var === null) {
            return false;
        } else if (Var === '') {
            return false;
        } else if (typeof (Var) === 'number') {
            return true;
        } else if (typeof (Var) === 'boolean') {
            return true;
        } else if (!Var.length) {
            return false;
        } else {
            return true;
        }
    };

    _.CreateElement = function (NodeName, ID, Class, Attributes) {

        ID = typeof (ID) === 'undefined' ? '' : ID;
        Class = typeof (Class) === 'undefined' ? '' : Class;
        Attributes = typeof (Attributes) === 'undefined' ? [] : Attributes;

        var Node;
        Node = document.createElement(NodeName);

        if (!!ID.length) {
            Node.id = ID;
        }

        if (!!Class.length) {
            Node.className = Class;
        }

        if (!!Attributes.length) {
            _.Each(Attributes, function (Attribute) {
                Node.setAttribute(Attribute.Name, Attribute.Value);
            });
        }

        return Node;
    };

    _.Merge = function (Object0, Object1) {

        Object0 = typeof (Object0) === 'undefined' ? {} : Object0;
        Object1 = typeof (Object1) === 'undefined' ? {} : Object1;

        var Object2 = Object0;

        var Keys0, Keys1, i;
        Keys0 = Object.keys(Object0);
        Keys1 = Object.keys(Object1);
        i = Keys0.length;
        while (!!i) {
            i -= 1;
            if (_.InArray(Keys0[i], Keys1)) {
                if (_.HasValue(Object1[Keys0[i]])) {
                    Object2[Keys0[i]] = Object1[Keys0[i]];
                }
            }
        }
        return Object2;
    };

    _.GetChild = function (Parent, NodeName) {
        var Children, Child, i;
        Children = Parent.children;
        Child = null;
        i = Children.length;
        while (!!i) {
            i -= 1;
            if (Children[i].nodeName.toLowerCase() === NodeName) {
                Child = Children[i];
            }
        }
        return Child;
    };

    _.Each = function (Items, CallBack) {
        var i;
        i = Items.length;
        while (!!i) {
            i -= 1;
            CallBack(Items[i]);
        }
    };

    _.AnimateLeft = function (List, StartPosition, TargetPosition, StartTime) {

        _.Options.Movement.Running = true;

        var CurrentTime, ElapsedTime, EndTime, ToElapse;
        CurrentTime = Date.now();
        ElapsedTime = CurrentTime - StartTime;
        EndTime = StartTime + (Math.abs(TargetPosition - StartPosition) / _.Options.Movement.Velocity);
        ToElapse = EndTime - StartTime;

        if (CurrentTime >= EndTime) {

            List.style.left = TargetPosition + 'px';

            if (_.Options.Movement.Position === (List.children.length - _.Options.Layout.Columns)) {

                _.Options.Movement.Position = _.Options.Layout.Columns;
                List.style.left = (List.children[_.Options.Movement.Position].offsetLeft * -1) + 'px';

            } else if (_.Options.Movement.Position === 0) {

                _.Options.Movement.Position = _.Options.Movement.Position + (List.children.length - (_.Options.Layout.Columns * 2));
                List.style.left = (List.children[(List.children.length - (_.Options.Layout.Columns * 2))].offsetLeft * -1) + 'px';

            }
            _.Options.Movement.Running = false;

            if (_.Options.Movement.Auto) {
                _.AutoMove();
            }

        } else {

            List.style.left = (StartPosition + ((TargetPosition - StartPosition) * (ElapsedTime / ToElapse))) + 'px';
            clearTimeout(_.AnimationTimeout);
            _.AnimationTimeout = setTimeout(function () {
                _.AnimateLeft(List, StartPosition, TargetPosition, StartTime);
            }, 16);
        }
    };

    _.UnsetAuto = function () {
        _.Options.Movement.Auto = false;
    };

    _.Move = function (To) {

        _.Options.Movement.Running = true;

        var OverflowHandler, List, Pos0, Pos1;

        OverflowHandler = _.Root.querySelector('.overflowHandler');
        List = _.GetChild(OverflowHandler, 'ul');

        Pos0 = parseInt(List.style.left);
        Pos1 = List.children[To].offsetLeft * -1;

        _.Options.Movement.Position = To;

        _.AnimateLeft(List, Pos0, Pos1, Date.now());

    };

    _.MovePrev = function (event) {
        event.preventDefault();
        event.stopImmediatePropagation();

        _.UnsetAuto();

        if (!_.Options.Movement.Running) {
            _.Move(_.Options.Movement.Position - 1);
        }
    };

    _.MoveNext = function (event) {
        event.preventDefault();
        event.stopImmediatePropagation();

        _.UnsetAuto();

        if (!_.Options.Movement.Running) {
            _.Move(_.Options.Movement.Position + 1);
        }
    };

    _.AutoMove = function () {
        var List;
        List = _.GetChild(_.Root.querySelector('.overflowHandler'), 'ul');
        setTimeout(function () {
            if (_.Options.Movement.Auto) {
                _.Move(_.Options.Movement.Position + 1);
            }
        }, _.Options.Movement.Pause + (List.children[_.Options.Movement.Position].clientWidth / _.Options.Movement.Velocity));
    };

    _.AddArrows = function () {

        var Arrow, Img;

        Arrow = _.CreateElement('a', '', 'arrow previous', [{
            'Name': 'href',
            'Value': '#'
        }]);
        Img = _.CreateElement('img', '', '', [{
            'Name': 'src',
            'Value': _.Options.Arrows.Left
        }]);

        Arrow.appendChild(Img);

        Arrow.addEventListener('click', _.MovePrev);
        Arrow.addEventListener('tap', _.MovePrev);

        _.Root.appendChild(Arrow);

        Arrow = _.CreateElement('a', '', 'arrow next', [{
            'Name': 'href',
            'Value': '#'
        }]);
        Img = _.CreateElement('img', '', '', [{
            'Name': 'src',
            'Value': _.Options.Arrows.Right
        }]);

        Arrow.appendChild(Img);

        Arrow.addEventListener('click', _.MoveNext);
        Arrow.addEventListener('tap', _.MoveNext);

        _.Root.appendChild(Arrow);

    };

    _.SetDimensions = function (First) {

        First = typeof (First) === 'boolean' ? First : false;

        var OverflowHandler, List;

        OverflowHandler = null;
        List = null;

        if (!!_.Root) {
            OverflowHandler = _.Root.querySelector('.overflowHandler');
        }

        if (!!OverflowHandler) {
            List = _.GetChild(OverflowHandler, 'ul');
        }

        var CalculatedWidth, CalculatedColumns;
        CalculatedWidth = OverflowHandler.clientWidth / _.Options.Layout.Columns;
        CalculatedWidth = Math.max(CalculatedWidth, _.Options.Layout.MinWidth);
        CalculatedWidth = Math.min(CalculatedWidth, OverflowHandler.clientWidth);

        CalculatedColumns = Math.max(Math.floor(OverflowHandler.clientWidth / CalculatedWidth), 1);
        if (CalculatedColumns < _.Options.Layout.Columns) {
            CalculatedWidth = OverflowHandler.clientWidth / CalculatedColumns;
        }

        var ListHeight;

        ListHeight = List.clientHeight;

        _.Each(List.children, function (Child) {
            Child.style.width = CalculatedWidth + 'px';
            Child.style.paddingTop = ((ListHeight - Child.clientHeight) * 0.5) + 'px';
            Child.style.paddingBottom = ((ListHeight - Child.clientHeight) * 0.5) + 'px';
        });

        if (First) {
            List.style.width = (CalculatedWidth * (List.children.length + (_.Options.Layout.Columns * 2))) + 'px';
        } else {
            List.style.width = (CalculatedWidth * List.children.length) + 'px';
            if (_.Options.Movement.Running) {
                clearTimeout(_.AnimationTimeout);
                _.Move(_.Options.Movement.Position);
            } else {
                List.style.left = (List.children[_.Options.Movement.Position].offsetLeft * -1) + 'px';
            }
        }

    };

    _.DuplicateElements = function (List) {

        var From, To;

        From = List.children.length - 1;
        To = List.children.length - _.Options.Layout.Columns;

        while (From >= To) {

            List.insertBefore(List.children[From].cloneNode(true), List.children[0]);

            To = List.children.length - _.Options.Layout.Columns;

        }

        From = _.Options.Layout.Columns;
        To = From + From;

        while (From < To) {

            List.appendChild(List.children[From].cloneNode(true));

            From += 1;
        }

        _.Options.Movement.Position = _.Options.Layout.Columns;

        _.SetDimensions(); /* grab real width */

    };

    _.WindowResize = function () {
        clearTimeout(_.ResizeTimeout);
        _.ResizeTimeout = setTimeout(_.SetDimensions, 100);
    };

    _.Initialise = function () {

        UserOptions = typeof (UserOptions) === 'undefined' ? {} : UserOptions;
        UserOptions.Arrows = typeof (UserOptions.Arrows) === 'undefined' ? {} : UserOptions.Arrows;
        UserOptions.Layout = typeof (UserOptions.Layout) === 'undefined' ? {} : UserOptions.Layout;
        UserOptions.Movement = typeof (UserOptions.Movement) === 'undefined' ? {} : UserOptions.Movement;

        _.Options.Arrows = _.Merge(_.Options.Arrows, UserOptions.Arrows);
        _.Options.Layout = _.Merge(_.Options.Layout, UserOptions.Layout);
        _.Options.Movement = _.Merge(_.Options.Movement, UserOptions.Movement);

        _.Options.Running = false;

        var OverflowHandler, List;

        OverflowHandler = null;
        List = null;

        _.Root = document.querySelector(Selector);

        if (!!_.Root) {
            OverflowHandler = _.Root.querySelector('.overflowHandler');
        }

        if (!!OverflowHandler) {
            List = _.GetChild(OverflowHandler, 'ul');
        }

        if (!!List) {

            if (!!List.children.length) {

                /* Only do carousel if needed (360 ~ mobile width (magic numbers are bad. don't be lazy like me)) */
                var ShouldMove = List.children.length > (360 / _.Options.Layout.MinWidth);

                if (ShouldMove) {

                    _.Options.Position = _.Options.Layout.Columns;

                    _.AddArrows();

                }

                _.SetDimensions(true); /* quickly make a vague guess for width */

                if (ShouldMove) {

                    _.DuplicateElements(List);

                    if (_.Options.Movement.Auto) {
                        _.AutoMove();
                    }

                }

                window.addEventListener('load', _.WindowResize);
                window.addEventListener('resize', _.WindowResize);
                try {
                    window.addEventListener('orientationchange', _.WindowResize);
                } catch (e) {
                    /* Orientation change event not supported */
                }

            }

        }

    };

    _.Initialise();

};


(function () {
    new MagicCarousel('#Dougal', {
        Arrows: {
            Left: 'http://mclweb.com.br/passion/img/download-1.png',
            Right: 'http://mclweb.com.br/passion/img/download.png'
        },
        Layout: {
            Columns: 4,
            MaxWidth: 350,
            MinWidth: 160,

        },
        Movement: {
            Auto: true,
            Velocity: 0.5
        }
    });
})();

(function () {
    new MagicCarousel('#Dougal02', {
        Arrows: {
            Left: 'http://mclweb.com.br/passion/img/download-1.png',
            Right: 'http://mclweb.com.br/passion/img/download.png'
        },
        Layout: {
            Columns: 4,
            MaxWidth: 350,
            MinWidth: 160,

        },
        Movement: {
            Auto: true,
            Velocity: 0.5
        }
    });
})();

(function () {
    new MagicCarousel('#Dougal03', {
        Arrows: {
            Left: 'http://mclweb.com.br/passion/img/download-1.png',
            Right: 'http://mclweb.com.br/passion/img/download.png'
        },
        Layout: {
            Columns: 4,
            MaxWidth: 350,
            MinWidth: 160,

        },
        Movement: {
            Auto: true,
            Velocity: 0.5
        }
    });
})();