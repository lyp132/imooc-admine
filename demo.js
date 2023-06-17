window.onload = function () {
    let box = document.getElementsByClassName('box')[0]
    box.addEventListener('click', () => {
        console.log('aaa')
        alert('这是测试代码')
    })
}