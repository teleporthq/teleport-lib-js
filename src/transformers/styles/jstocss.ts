import jss from 'jss'
import preset from 'jss-preset-default'

jss.setup(preset())

const generateClassName = (rule, sheet) => rule.key

export default function transform(styles) {
  const styleSheet = jss.createStyleSheet(styles, {generateClassName})

  return {
    classNames: styleSheet.classes,
    css: styleSheet.toString()
  }
}