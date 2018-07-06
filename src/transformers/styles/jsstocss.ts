import jss from 'jss'
import preset from 'jss-preset-default'

jss.setup(preset())

// @todo: check why we use key (does not exist on type rule)
export const generateClassName = (rule: any) => rule.key

export function stylesheet(styles) {
  const styleSheet = jss.createStyleSheet(styles, { generateClassName })

  return {
    classNames: styleSheet.classes,
    css: styleSheet.toString(),
  }
}
