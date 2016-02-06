'use strict'

const esprima = require('esprima')
const fs = require('fs')
const path = require('path')

const netsuiteApi = fs.readFileSync(path.join(__dirname, '..', 'vendor', 'netsuite-api.js'))
const outPath = path.join(__dirname, '..', 'vendor', 'netsuite-api.json')
const ast = esprima.parse(netsuiteApi, {attachComment: true})

const output = []

let prevComment = null

ast.body.forEach((item, index) => {
  let comment = null
  if (item.leadingComments != null) {
    if (index === 0) {
      // omit header comment which is not related to any function
      comment = item.leadingComments[1]
    } else {
      comment = item.leadingComments[0]
    }
  } else {
    comment = prevComment
  }
  if (item.type === 'FunctionDeclaration') {
    output.push({
      value: item.id.name, // NOTE: try to improve search by converting camelcase to dash seperated
      label: item.id.name,
      params: item.params.map(p => p.name),
      comment: comment.value.trim()
    })
  }
  prevComment = comment
})

fs.writeFileSync(outPath, JSON.stringify(output, null, 2), {encoding: 'utf8'})
