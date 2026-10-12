// Live map 内容。存档后，打开的页面一秒内自动更新。
// 字段说明：../reference/data-format.md
window.MAP = {
  lang: 'zh-Hans', // 界面语言：'en' | 'zh-Hant' | 'zh-Hans'（内容用用户的语言写）
  title: '示例：读书笔记 app 加多设备同步',
  tree: {
    t: '多设备同步',
    ex: [['u', '手机上划的线，电脑上马上看到。']],
    kids: [
      {
        t: '同步什么',
        mark: 'core',
        ex: [['n', '笔记、划线、书单。']],
        kids: [
          { t: '笔记正文', mark: 'draft', ex: [['n', '每条笔记一份。']] },
          { t: '划线', mark: 'draft', links: [[2, 0]], ex: [['n', '划线跟着书的位置走。']] },
          { t: '图片附件', mark: 'later', ex: [['n', '先不传图，太大。']] }
        ]
      },
      {
        t: '怎么同步',
        mark: 'draft',
        cmp: { them: 'Notion、Obsidian Sync：改一下就传，后台合并。', us: '现在只存在本机。', st: 'bad' },
        flow: [
          { role: '每次改动', items: [0] },
          { rel: '然后', items: [1] },
          { rel: '另一台设备', items: [2] }
        ],
        base: { rel: '靠', items: [3] },
        kids: [
          { t: '本机先存', mark: 'draft', ex: [['n', '没网也能写。']] },
          { t: '有网就上传', mark: 'draft', ex: [['n', '几秒内传上去。']] },
          { t: '自动拉下来', mark: 'draft', ex: [['n', '打开 app 就是最新。']] },
          { t: '云端存储', mark: 'res', ex: [['n', '用现成的云数据库。']] }
        ]
      },
      {
        t: '冲突',
        mark: 'now',
        kids: [
          { t: '两边都改了', mark: 'set', ex: [['u', '手机和电脑同时改一条笔记怎么办？'], ['a', '两份都留，让你挑。']] },
          { t: '删了又改', mark: 'chg', was: { from: '删的那边赢', to: '改的那边赢，不丢字' }, ex: [['n', '改的那边赢，不丢字。']] }
        ]
      },
      {
        t: '登录',
        mark: 'draft',
        ex: [['n', '邮箱链接登录，一个账号。']]
      }
    ]
  }
};
