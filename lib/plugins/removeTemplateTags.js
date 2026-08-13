//matches the innermost <template> block (its contents can't include any template tag)
const INNERMOST_TEMPLATE =
  /<template\b[^>]*>(?:(?!<\/?template\b)[\s\S])*<\/template\s*>/gi;

module.exports = {
  pageLoaded: (req, res, next) => {
    if (!req.prerender.content || req.prerender.renderType != 'html') {
      return next();
    }

    //peel off one nesting level per pass until nothing is left to remove
    let content = req.prerender.content.toString();
    let previous;
    do {
      previous = content;
      content = content.replace(INNERMOST_TEMPLATE, '');
    } while (content !== previous);

    req.prerender.content = content;

    next();
  },
};
