import '../less/pageComponent.less';
import ComponentBaseFactory from './ComponentBase.js';
import ComponentPolyLineFactory from './ComponentPolyLine.js';
import ComponentPieFactory from './ComponentPie.js';
import ComponentBarFactory from './ComponentBar.js';
let ManageObj = {
    init (name) {
        this.oContainer = $('<div/>').addClass(name);
        this.oContainer.appendTo($('body')).hide(); 
        return this;       
    },
    addPage (name) {
        this.oPage = $('<div class="section"/>').addClass(name);
        this.oPage.appendTo(this.oContainer);
        this.addBottomComponent();
        return this;
    },
    addComponent (config = {type: 'Bar'}) {
        let Component = null;
        switch (config.type) {
            case "Poly": 
                    Component = ComponentPolyLineFactory(config);
                break;
            case "Pie": 
                    Component = ComponentPieFactory(config);
                break;
            case "Bar":
                    Component = ComponentBarFactory(config);
                break;
            case "base":
            default:
                    Component = ComponentBaseFactory(config);   
        }
        this.oPage.append(Component);
        return this;
    },
    addBottomComponent () {
        this.addComponent({
            width: '100%',
            height: '40px',
            text: '365389400@qq.com-cf',
            css: {
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                textAlign: 'center',
                lineHeight: '18px',
                color: '#000',
                background: '#eee',
                opacity: 0.5
            },
            animateIn: {
                opacity: 0.8
            },
            animateOut: {
                opacity: 0,
                bottom: -10                
            }                        
        })
    },
    load () {
        this.oContainer.show();
        this.oContainer.fullpage({
            sectionsColor: ['orange', 'green', 'deeppink'],
            onLeave (index, nextIndex, direction) {
                // 扎找到离开页面
                $('.section').eq(index - 1).trigger('onLeave');
            },
            afterLoad (achorLink, index) {
                $('.section').eq(index - 1).trigger('onLoad');
            }
        });
        $('.section').on('onLeave', (e) => {
            $(e.target).find('.ComponentBase').trigger('cpLeave');
        });
        $('.section').on('onLoad', (e) => {
            $(e.target).find('.ComponentBase').trigger('cpLoad');
        });
        $('.section').eq(0).trigger('onLoad');
    }
}
export default ManageObj;