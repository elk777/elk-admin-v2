/*
 * @Author: elk
 * @Date: 2023-11-27 16:17:02
 * @LastEditors: elk 1185725133@qq.com
 * @LastEditTime: 2023-11-28 10:44:43
 * @FilePath: /vue2_project/src/libs/utils/theme.js
 * @Description: 处理theme样式的工具类
 */

/**
 * @description:  修改style样式表
 * @param:
 *     @style        要替换的样式表
 *     @oldCluster   之前的颜色集群
 *     @newCluster   新的颜色集群
 * @return {*}:   替换后的样式表
 */
const updateStyle = (style, oldCluster, newCluster) => {
    let newStyle = style;
    oldCluster.forEach((color, index) => {
        newStyle = newStyle.replace(new RegExp(color, 'ig'), newCluster[index]);
    })
    return newStyle;
}

/**
 * @description: 在线获取css样式表
 * @return {*}
 */
const getCSSString = (url, variable) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                // this[variable] = xhr.responseText.replace(/@font-face{[^}]+}/, '');
                const chalk =  xhr.responseText.replace(/@font-face{[^}]+}/, '');
                resolve(chalk);
            }
        }
        xhr.open('GET', url);
        xhr.send()
    })
}

/**
 * @description: 用于生成一个颜色集群。
 * @param theme: 颜色十六进制数
 * @return {*}: 是一个数组，颜色集群是一个包含多个颜色的集合，这些颜色都具有相似的色调和饱和度
 */
const getThemeCluster = (theme) => {
    const tintColor = (color, tint) => {
      let red = parseInt(color.slice(0, 2), 16)
      let green = parseInt(color.slice(2, 4), 16)
      let blue = parseInt(color.slice(4, 6), 16)

      // 当原色在其RGB空间中时
      if (tint === 0) { 
        return [red, green, blue].join(',')
      } else {
        red += Math.round(tint * (255 - red))
        green += Math.round(tint * (255 - green))
        blue += Math.round(tint * (255 - blue))

        red = red.toString(16)
        green = green.toString(16)
        blue = blue.toString(16)

        return `#${red}${green}${blue}`
      }
    }

    const shadeColor = (color, shade) => {
      let red = parseInt(color.slice(0, 2), 16)
      let green = parseInt(color.slice(2, 4), 16)
      let blue = parseInt(color.slice(4, 6), 16)

      red = Math.round((1 - shade) * red)
      green = Math.round((1 - shade) * green)
      blue = Math.round((1 - shade) * blue)

      red = red.toString(16)
      green = green.toString(16)
      blue = blue.toString(16)

      return `#${red}${green}${blue}`
    }

    const clusters = [theme]
    for (let i = 0; i <= 9; i++) {
      clusters.push(tintColor(theme, Number((i / 10).toFixed(2))))
    }
    clusters.push(shadeColor(theme, 0.1))
    return clusters
}

export {
    updateStyle,
    getCSSString,
    getThemeCluster
}