import React from 'react'

export default class Help extends React.Component {

    render(){
            return (
        <div className="helpdiv" id="helpdiv">
            我是一个epub阅读WEB APP,不同于传统的网站,我用起来就像一个原生手机应用一样,例如,没有网络连接,我仍然可以使用.
            目前我能阅读epub电子书,功能有:
            <ul>
                <li>
                    epub阅读,本地导入epub文件和在线下载,下载epub后,在没有网络连接的环境下也可以打开App阅读
                </li>
                <li>
                    上传电子书,在你所有的设备阅读
                </li>
                <li>
                    英语词典,本地查词(使用柯林斯英汉双解辞典)和在线词典(使用有道网页词典服务)
                </li>
                <li>
                    便捷查词,阅读英文时碰到不会的单词,选中该单词(电脑上鼠标双击,手机长按那个单词),可启动词典快速查词
                </li>
                
            </ul>
            

            <div>
                <h3>如何阅读</h3>
                <p>
                    可以选择本地导入:你应该看到了屏幕右下方的浅蓝色圆形按钮,点击它,你可以看到很多有用的功能,
                    有一个就是import,点击即可导入,注意只能是epub文件;之后你会看到LOCAL SHELF(本地书架)上多了一本书,
                    点击read按钮阅读即可;
                </p>
                <p>
                    也可选择在线书架下载,点击屏幕上方的Online 来到在线书架 ONLINE SHELF,点击download按钮即可下载到本地书架
                </p>
                <p>
                    我有全屏阅读模式,单击蓝色按钮,选择fullscreen(全屏)即可
                </p>
            </div>
            <div>
                <h3>
                    词典使用:
                </h3>
                <p>
                    下载离线辞典,点击屏幕上方的Dict,你会看到有几个词典文件,我推荐下载collins_plus.json,包含了7000个最常用的英语单词,下载成功后会有提醒,此时重新打开App即可使用离线辞典
                </p>
                <p>
                    双击蓝色按钮可在任意界面打开词典;
                    阅读时选中任意单词也可启动词典自动查词;
                </p>
                <p>
                    词典上方有max按钮,单击可以最大化词典,你会看到多了一个大输入框;
                </p>
                <p>词典上方的按钮有时很有用,可以都尝试一下</p>
            </div>


            <p>
                <b>最后,你可以点击蓝色按钮,找到Home选项即可回到主页开始阅读</b>
            </p>
        </div>
    );

    }
        
    componentDidMount(){
        window.scrollTo({ top: 0, behavior: 'smooth' });
    
    }
    
    
}