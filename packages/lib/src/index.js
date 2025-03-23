const MOUSE_REVEAL_CONFIG = {
    maxSize: 240,
    minSize: 0,
	background: '#000',
};

class MouseReveal {
    constructor(element, config = {}) {
        this.mask = document.querySelector(element);

        if (!this.mask) {
            console.error('Mask element not found for the provided selector: ', element);
            return;
        }
        this.id = this.mask.id;

        this.back = this.mask.firstElementChild; // contain the mask image
        this.front = this.mask.lastElementChild; // contain the content

        this.maxSize = config.maxSize ?? MOUSE_REVEAL_CONFIG.maxSize;
        this.minSize = config.minSize ?? MOUSE_REVEAL_CONFIG.minSize;

        // set the css variables
        document.documentElement.style.setProperty(`--mask-${this.id}-size`, `0px`);
        document.documentElement.style.setProperty(`--mask-${this.id}-x`, '0px');
        document.documentElement.style.setProperty(`--mask-${this.id}-y`, '0px');

        // set the styles
	    this.back.style.background = config.background ?? MOUSE_REVEAL_CONFIG.background;
        this.mask.style.position = 'relative'
        this.front.style.position = 'relative';
        this.front.style.zIndex = '-20';
        this.back.style.position = 'absolute';
        this.back.style.left = '0';
        this.back.style.top = '0';
        this.back.style.zIndex = '10';
        this.back.style.maskImage = "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgZmlsbD0ibm9uZSI+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjUwIiBmaWxsPSJibGFjayIvPgo8L3N2Zz4=')";
        this.back.style.maskRepeat = 'no-repeat';
        this.back.style.maskSize = `var(--mask-${this.id}-size), contain`;
        this.back.style.maskOrigin = 'content-box';
        this.back.style.maskPosition = `calc(var(--mask-${this.id}-x) - var(--mask-${this.id}-size)/2) calc(var(--mask-${this.id}-y) - var(--mask-${this.id}-size)/2), center`;

        this.back.style.width = `${this.front.offsetWidth}px`;
        this.back.style.height = `${this.front.offsetHeight}px`

        this.setupListeners();
    }

    setupListeners() {
        this.back.addEventListener('mousemove', (e) => {
            this.updateMaskPosition(e);
        });

        // window.addEventListener('scroll', () => {
        //   this.updateMaskPosition(); // but does not work
        // });

        this.back.addEventListener('mouseenter', () =>
            this.animateMaskSize(
                this.minSize ?? MOUSE_REVEAL_CONFIG.minSize,
                this.maxSize ?? MOUSE_REVEAL_CONFIG.maxSize
            )
        );

        this.back.addEventListener('mouseleave', () =>
            this.animateMaskSize(
                this.maxSize ?? MOUSE_REVEAL_CONFIG.maxSize,
                this.minSize ?? MOUSE_REVEAL_CONFIG.minSize
            )
        );
    }

    updateMaskPosition(e) {
        var maskPosition = this.back.getBoundingClientRect();
        const absX = e.clientX - maskPosition.left // + window.scrollX;
        const absY = e.clientY - maskPosition.top // + window.scrollY;
        document.documentElement.style.setProperty(`--mask-${this.id}-x`, `${absX}px`);
        document.documentElement.style.setProperty(`--mask-${this.id}-y`, `${absY}px`);
    }

    animateMaskSize(startSize, endSize) {
        const currentSize = parseFloat(getComputedStyle(document.documentElement).getPropertyValue(`--mask-${this.id}-size`)) || startSize;
        const duration = 200;
        const start = performance.now();

        const animate = (time) => {
            let progress = (time - start) / duration;
            if (progress > 1) progress = 1;

            const currentMaskSize = currentSize + (endSize - currentSize) * progress;
            document.documentElement.style.setProperty(`--mask-${this.id}-size`, `${currentMaskSize}px`);

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = MouseReveal;
} else {
    window.MouseReveal = MouseReveal;
}
