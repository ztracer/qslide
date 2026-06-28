---
theme: default
title: 形式化验证 × 后量子协议迁移
fonts:
  sans: Noto Sans CJK SC
  mono: JetBrains Mono
routerMode: hash
colorSchema: light
canvasWidth: 1280
---

<div class="cover-root">
  <div class="cover-kicker">Formal Verification · Post-Quantum Protocols</div>
  <h1 class="cover-title">形式化验证 ×<br><span class="text-pq">后量子协议迁移</span></h1>
  <div class="cover-rule"></div>
  <p class="cover-subtitle">今天被记录下的通信，十年后还安全吗？我们用三篇论文看协议迁移问题。</p>
</div>

<!--
被记录下的加密通信，十年后能解开吗？今天我们就用两篇论文看一件事：协议迁移到量子密码环境下还能不能保障安全。
-->

---
layout: default
---

<div class="deck-slide">
  <h2>HNDL：收集，然后未来解密</h2>
  <p class="slide-lede">HNDL的威胁早已存在，这种攻击与传统攻击不同，攻击者专注于数据的长期价值，而非数据的直接利用价值。这种方法背后的假设是 —— 量子计算的进步最终将使 RSA和 ECC 等现有加密标准过时。</p>
  <div class="timeline">
    <div class="timeline-step">
      <div class="step-time">Today</div>
      <div class="step-title text-quantum">攻击者先存数据</div>
      <div class="step-body">不需要立刻破解。仅需求监听网络，从而能保存 VPN 握手、聊天记录和 TLS 流量。</div>
    </div>
    <div class="timeline-step">
      <div class="step-time">Later</div>
      <div class="step-title text-quantum">等工具成熟后回头解</div>
      <div class="step-body">如果当年的握手依赖 RSA、ECC 或 DH这些传统算法，未来的量子计算机有机会恢复旧会话密钥，从而使信息安全存在问题。</div>
    </div>
    <div class="timeline-step">
      <div class="step-time">Question</div>
      <div class="step-title text-pq">协议安全性</div>
      <div class="step-body">迁移问题要回答旧密文、旧密钥和旧握手还能暴露多久。</div>
    </div>
  </div>
  <div class="takeaway quantum">HNDL：Harvest Now, Decrypt Later</div>
</div>

<!--
HNDL 可以翻成一句人话：先收割，未来再解密。它描述的是一种时间上的攻击策略。
攻击者现在只需要监听和保存；未来如果经典握手材料能被恢复，旧通信就会被重新打开。
今天在讲完背景概念后，用3篇论文分别分析哪些协议。
-->



---
layout: default
---

<div class="deck-slide quantum-compare">
  <h2>量子算法的冲击：公钥被冲击，协议迁移迫在眉睫</h2>
  <p class="slide-lede">量子计算破坏了现有公钥握手和身份认证的安全前提</p>
  <div class="slide-grid">
    <div class="algorithm-card shor-card">
      <div class="paper-kicker">公钥侧</div>
      <div class="quote-line"><span class="text-quantum">Shor</span> 让 RSA、DH 和椭圆曲线的数学难题不再可靠</div>
      <p class="algorithm-plain">它能高效求解大数分解和离散对数；这些正是传统公钥握手和签名依赖的难题。</p>
      <div class="compact-list">
        <p><strong>它影响什么：</strong>RSA、DH/ECDH、ECDSA、X25519/P-256 这类公钥基础。</p>
        <p><strong>协议后果：</strong>握手密钥、身份认证和旧会话材料都要重做。</p>
        <p><strong>亟需解决的问题：</strong>公钥握手迁移以后，协议状态是否仍然安全。</p>
      </div>
    </div>
    <div class="algorithm-card grover-card">
      <div class="paper-kicker">对称侧</div>
      <div class="quote-line"><span class="text-hybrid">Grover</span> 主要让暴力搜索更快</div>
      <p class="algorithm-plain">它把暴力搜索的量级从 N 次量级降到约 √N 次；让我们需要更长的密钥 </p>
      <div class="compact-list">
        <p><strong>影响了：</strong>AES、SHA、MAC、KDF 这类对称组件的安全余量。</p>
        <p><strong>处理方法：</strong>调大密钥或输出长度，给搜索成本留更多空间。</p>
      </div>
    </div>
  </div>
  <div class="takeaway quantum">公钥握手如果要改，状态机也需要修改。所以后面的论文都回答了这样一个问题：重写以后，状态还安全吗。</div>
</div>

<!--
Shor 打公钥，能处理大数分解和离散对数，所以 RSA、DH、椭圆曲线会破。
Grover 主要让对称密码的搜索成本下降，但通常可以靠加大密钥长度处理。
所以真正要大改的是公钥握手和身份认证。握手一改，协议状态机就要跟着改。
-->

---
layout: default
---

<div class="deck-slide pqc-assembly">
  <h2>协议的状态机：后量子迁移时研究重心</h2>
  <p class="slide-lede">协议要决定后量子组件怎样进入状态机：谁生成、绑定谁、何时派生、何时删除。</p>
  <div class="assembly-layout">
    <div class="assembly-side">
      <div class="assembly-label">后量子组件</div>
      <div class="part-list">
        <div class="part-item pq">
          <strong>后量子密钥封装机制（KEM）</strong>
          <span>一方用对方公钥封装出共享秘密；ML-KEM 和 Classic McEliece 都属于这类组件。</span>
          <span>※能不能产生抗量子共享秘密</span>
        </div>
        <div class="part-item hybrid">
          <strong>密钥派生函数（KDF）</strong>
          <span>把经典秘密、后量子秘密、身份和消息记录混合成真正可用的会话密钥。</span>
          <span>它的位置决定旧状态和新材料怎样影响后续消息。</span>
        </div>
      </div>
    </div>
    <div class="assembly-arrow">→</div>
    <div class="assembly-side protocol-questions">
      <div class="assembly-label">状态机必须写清</div>
      <div class="question-grid">
        <div><strong>谁生成？</strong><span>客户端、服务器或设备在什么时候生成公钥、私钥和临时秘密？</span></div>
        <div><strong>绑定谁？</strong><span>协议怎样确认这份新材料属于目标设备、服务器或同一轮握手？</span></div>
        <div><strong>何时派生？</strong><span>经典秘密和后量子秘密在哪一步一起进入会话密钥？</span></div>
        <div><strong>何时删除？</strong><span>密钥泄露前后，哪些历史消息或会话还能被保护？</span></div>
      </div>
    </div>
  </div>
</div>

<!--

KEM、KDF 只是零件。后量子 KEM 可以产生共享秘密，KDF 可以派生会话密钥，但协议还要写清谁生成、绑定谁、什么时候派生、什么时候删除。这些问题共同决定旧密文、旧密钥和未来泄露之间的关系。

协议还要说清楚：谁生成密钥？绑定谁？什么时候派生？什么时候删除？

后量子迁移不是替换一个函数，而是重写状态机。

状态问题一多，人工只画正常流程就容易漏掉攻击路径。所以我们需要工具-》

-->

---
layout: default
---

<div class="deck-slide formal-intro-slide">
  <h2>形式化验证：自动探寻众多分支，寻找可能的"坏路径"</h2>
  <p class="slide-lede">验证工具系统地自动探寻模型不同的走法</p>
  <div class="formal-check-layout">
    <div class="model-card">
      <div class="paper-kicker">建模中要包含的三个关键点</div>
      <div class="model-row">
        <div class="row-index proto">1</div>
        <div>
          <strong>在一步内允许发生的动作 <em>rule</em></strong>
          <p>发送、接收、生成密钥、删除密钥。</p>
        </div>
      </div>
      <div class="model-row">
        <div class="row-index formal">2</div>
        <div>
          <strong>这一步留下的状态 <em>fact</em></strong>
          <p>会话、密钥、公开消息和攻击者已经知道的信息。</p>
        </div>
      </div>
      <div class="model-row">
        <div class="row-index pq">3</div>
        <div>
          <strong>工具要排除的坏事 <em>lemma</em></strong>
          <p>秘密被知道、接收没有对应发送、泄露后恢复失败。</p>
        </div>
      </div>
    </div>
    <div class="counterexample-card">
      <div class="paper-kicker">工具在规定的攻击者能力下找反例</div>
      <div class="counter-question">攻击者能不能走到这个坏结果？</div>
      <div class="bad-path">
        <div>协议状态里生成一份会话秘密</div>
        <div>攻击者重放、改写或插入消息</div>
        <div class="bad-step">攻击者也能推出这份秘密</div>
      </div>
      <div class="attacker-model-box">
        <strong>攻击者模型说明“工具允许敌手做什么”</strong>
        <p>默认网络由攻击者控制：能截获、重放、改写和插入消息。</p>
        <p>敌手不能凭空破解密码学难题；只能从已知消息、泄露密钥和协议规则推导。</p>
      </div>
    </div>
  </div>
</div>

<!--
上一页列出了协议状态要决定的四件事，人工只画正常流程很容易漏掉重放、乱序和不同泄露时刻。

"为什么需要工具"：因为状态分支太多，验证工具帮我们系统搜索坏路径。

验证工具会把重放、插入、乱序、泄露时刻都放进来找坏路。rule 是一步动作，fact 是留下的状态，lemma 是要检查的坏事。

Dolev-Yao 是这类协议证明常用的网络攻击者模型：攻击者控制网络，但不能直接破解密码原语。

转场：知道为什么要验证以后，再看验证要检查的第一个具体难点：KEM 接到 DH 的位置时，方向变了。

-->

---
layout: default
---

<div class="deck-slide kem-dh-slide">
  <h2>迁移的第一个要点：KEM 和 DH 的方向不同</h2>
  <p class="slide-lede">验证：后量子密钥封装机制（KEM）放到原来 Diffie-Hellman（DH）位置以后，身份和计算方法是否正确。</p>
  <div class="slide-grid wide-left">
    <div class="method-card kem-card">
      <div class="paper-kicker">密钥封装机制（KEM）</div>
      <div class="method-analogy">核心动作：一方用对方公钥封装出共享秘密。</div>
      <div class="operation-list">
        <div class="operation-step">
          <strong>1. 接收方先生成密钥</strong>
          <p><code>(pk, sk) ← KeyGen()</code>：公开 <code>pk</code>，自己保存 <code>sk</code>。</p>
        </div>
        <div class="operation-step">
          <strong>2. 发送方用公钥封装</strong>
          <p><code>(ct, ss) ← Encaps(pk)</code>：发出密文 <code>ct</code>，本地得到共享秘密 <code>ss</code>。</p>
        </div>
        <div class="operation-step">
          <strong>3. 接收方用私钥解封装</strong>
          <p><code>ss ← Decaps(sk, ct)</code>：从 <code>ct</code> 恢复同一个共享秘密。</p>
        </div>
      </div>
      <div class="compact-list">
        <p><strong>方向感：</strong>封装者面向某个接收方公钥。</p>
        <p><strong>检查点：</strong>这个公钥属于谁，密文属于哪一轮会话。</p>
      </div>
    </div>
    <div class="method-card dh-card">
      <div class="paper-kicker">Diffie-Hellman（DH）密钥交换</div>
      <div class="method-analogy">核心动作：两边各自贡献秘密材料，再算出同一个结果。</div>
      <div class="operation-list">
        <div class="operation-step">
          <strong>1. 双方发送公开材料</strong>
          <p>A 发 <code>g^a</code>，B 发 <code>g^b</code>。</p>
        </div>
        <div class="operation-step">
          <strong>2. 双方各自计算</strong>
          <p>A 算 <code>(g^b)^a</code>，B 算 <code>(g^a)^b</code>。</p>
        </div>
        <div class="operation-step">
          <strong>3. 得到同一份秘密</strong>
          <p>两边都得到 <code>g^{ab}</code>，可继续进入密钥派生。</p>
        </div>
      </div>
      <div class="compact-list">
        <p><strong>方向感：</strong>双方对称地贡献秘密。</p>
        <p><strong>检查点：</strong>静态公钥在很多协议里还带身份含义。</p>
      </div>
    </div>
  </div>
  <div class="takeaway hybrid">谁接收封装、谁证明身份、密文和共享秘密进入哪一轮状态。</div>
</div>

<!--

KEM 是“我用你的公钥封装给你”；
DH 是“两边一起算”。

DH 是双方一起算出同一个秘密。
Alice 出一个临时私钥 a 和公钥 g^a，Bob 出 b 和 g^b。
Alice 算 (g^b)^a，Bob 算 (g^a)^b，两边得到同一个值 g^{ab}。

KEM 是一方用对方公钥“封装”出一个秘密。
Bob 先有一对 KEM 公私钥。Alice 拿 Bob 的公钥，生成一份共享秘密 ss 和一个密文 ct，把 ct 发给 Bob。Bob 用私钥解封装 ct，得到同一个 ss。

-->

---
layout: default
---

<div class="deck-slide hybrid-binding-slide">
  <h2>迁移的第二个要点：两份秘密不能错绑</h2>
  <p class="slide-lede">第二类检查点来自混合迁移：经典 DH 和后量子 KEM 都能给协议一份共享秘密，证明要确认它们没有被挪到不同对象、方向或时间窗口里。</p>
  <div class="hybrid-route">
    <div class="secret-source classic-source">
      <div class="paper-kicker">经典材料</div>
      <div class="source-title">DH 共享秘密</div>
      <p>X25519、P-256 这类现有握手材料，负责兼容今天的实现和经典安全假设。</p>
    </div>
    <div class="route-token">+</div>
    <div class="secret-source pq-source">
      <div class="paper-kicker">后量子材料</div>
      <div class="source-title">KEM 共享秘密</div>
      <p>后量子 KEM 产生的新共享秘密，负责应对未来量子攻击。</p>
    </div>
    <div class="route-token arrow">→</div>
    <div class="secret-source session-source">
      <div class="paper-kicker">同一轮会话</div>
      <div class="source-title">一起进入密钥派生</div>
      <p>派生密钥时同时放入双方身份、发起/响应方向和本轮消息记录。</p>
    </div>
  </div>
  <div class="binding-questions">
    <div class="binding-card who">
      <div class="binding-label">对象</div>
      <strong>这把钥匙是跟谁协商的？</strong>
      <p>双方拿到同一把钥匙时，也必须认定同一个对方。</p>
    </div>
    <div class="binding-card role">
      <div class="binding-label">角色</div>
      <strong>哪边发起，哪边响应？</strong>
      <p>KEM 有发送方和接收方，角色混淆会让认证结论失真。</p>
    </div>
    <div class="binding-card time">
      <div class="binding-label">时间</div>
      <strong>哪一步生成，哪一步删除？</strong>
      <p>前向保密和恢复性都要靠这个时间边界判断。</p>
    </div>
  </div>
  <div class="takeaway">两份秘密必须绑定到同一轮会话，后面三篇论文都会用不同方式检查这个绑定。</div>
</div>

<!--
混合方案听起来像双保险。

经典 DH 和后量子 KEM 各自给出一份秘密，协议设计的工作是把它们和同一次会话绑牢。

但两份秘密如果绑到不同对象、不同角色、不同时间，保险就会串线。

转场：现在可以回到三篇论文，看看同一个迁移问题分别落在消息状态、握手状态和隧道状态上。

-->

---
layout: default
---

<div class="deck-slide case-map-slide">
  <h2>三篇论文总览</h2>
  <p class="slide-lede">同：改状态机、找坏路径、检查绑定；异：协议、状态</p>
  <div class="case-compare-table">
    <div class="case-row header">
      <span>论文</span>
      <span>迁移层次</span>
      <span>要保护的状态</span>
      <span>验证重点</span>
    </div>
    <div class="case-row pq">
      <strong>PQ3<br><em>USENIX Security'25</em></strong>
      <span>iMessage 设备到设备消息</span>
      <span>长期对话、设备状态、不断前进的密钥</span>
      <span>机密性、认证、泄露后恢复</span>
    </div>
    <div class="case-row hybrid">
      <strong>Hybrid-WireGuard<br><em>USENIX Security'25</em></strong>
      <span>VPN 两消息握手</span>
      <span>身份绑定、方向、密钥派生链</span>
      <span>未知密钥共享、前向保密、自适应泄露</span>
    </div>
    <div class="case-row proto">
      <strong>PQConnect<br><em>NDSS'25</em></strong>
      <span>网络层端到端隧道</span>
      <span>自动发现、隧道密钥、包级擦除窗口</span>
      <span>握手组件、密钥擦除、部署边界</span>
    </div>
  </div>
  <div class="takeaway formal">读这三篇论文时，先问迁移放在哪一层，再问状态怎么变、泄露怎么进模型。</div>
</div>

<!--
三篇论文放在一起的原因是它们共享同一个核心问题：后量子材料加入以后，协议状态是否仍然安全。

差异在层次：PQ3 是长期消息状态，Hybrid-WireGuard 是两消息 VPN 握手，PQConnect 是网络层端到端隧道。

第一个案例从 iMessage PQ3 开始，因为长期聊天记录最直接对应“先截获、未来解密”的攻击模式。

-->



---
layout: default
---

<div class="section-slide">
  <div class="section-kicker">Case A · PQ3【USENIX Security'25】</div>
  <h1 class="section-title">iMessage PQ3：长期对话在未来泄露后还能安全到哪里</h1>
  <div class="section-points">
    <p>PQ3 对应开场的 HNDL 问题：聊天记录会保存很久，攻击者也可以保存很久。</p>
    <p>论文使用 Tamarin 模型验证，探索迁移后、经典秘密泄露时【设备到设备消息状态】安全程度如何。</p>
    <p>接下来先定义这个未来敌手，再看 PQ3 怎样让后量子材料贯穿密钥链。</p>
  </div>
</div>

<!--
第一个 case，PQ3。
问题很朴素：未来经典秘密泄露以后，老消息还能不能保住？

-->

---
layout: default
---

<div class="deck-slide pq3-roadmap-slide">
  <h2>1.1 PQ3 两条主线：迁移后的协议安全 + 形式化证明能力</h2>
  <p class="slide-lede">前半段看 iMessage PQ3 怎样挡住未来经典秘密泄露；后半段看论文怎样把一个带嵌套循环的真实协议交给 Tamarin 证明。</p>
  <div class="pq3-roadmap-grid">
    <div class="pq3-roadmap-card threat">
      <div class="paper-kicker">先定义敌手/威胁模型</div>
      <strong>PQAttackerStart</strong>
      <p>未来秘密泄露问题：所有非后量子秘密都将暴露给攻击者，包括身份密钥/ECDH预密钥/临时ECDH秘密。不被泄露的部分：KEM 相关的后量子秘密保持安全，代表后量子假设仍然成立</p>
    </div>
    <div class="pq3-roadmap-card mechanism">
      <div class="paper-kicker">机制</div>
      <strong>KEM 材料进入密钥链</strong>
      <p>从会话根到消息链，再到单条消息密钥。</p>
    </div>
    <div class="pq3-roadmap-card property">
      <div class="paper-kicker">安全性质</div>
      <strong>泄露条件决定边界</strong>
      <p>保密、认证、前向保密和泄露后恢复</p>
    </div>
    <div class="pq3-roadmap-card method">
      <div class="paper-kicker">最后看方法贡献</div>
      <strong>Tamarin 处理嵌套循环</strong>
      <p>辅助结论把真实协议压到可证明范围</p>
    </div>
  </div>
  <div class="takeaway formal">PQ3 回答”iMessage 安全程度”，还回答了”符号验证工具能不能处理真实的嵌套循环协议”。</div>
</div>

<!--
这页给 PQ3 case 内部路线，让后面的论文图都挂在同一条问题链上。
第一条线是协议安全：敌手模型、密钥机制、安全性质和边界。
第二条线是方法贡献：Tamarin 通过证明工程处理嵌套循环协议。
转场：先从敌手开始，PQ3 到底把未来量子能力抽象成什么事件？
-->

---
layout: default
---

<div class="deck-slide pq-attack-slide">
  <h2>1.2 PQ3 敌手：PQAttackerStart</h2>
  <p class="slide-lede">面对 HNDL，论文不是真的在模型里放一台量子计算机😀；它把未来量子能力抽象成一个事件：【经典公钥】相关的秘密全部暴露。</p>
  <div class="attack-event">
    <div class="event-step past">
      <div class="event-time">今天</div>
      <strong>攻击者保存网络消息</strong>
      <p>聊天内容、握手消息和公开密钥材料都可能被长期记录。</p>
    </div>
    <div class="event-step quantum">
      <div class="event-time">未来某刻</div>
      <strong>经典秘密交给攻击者</strong>
      <p>身份密钥、ECDH 预密钥和临时 ECDH 秘密都视为可恢复。</p>
    </div>
    <div class="event-step proof">
      <div class="event-time">验证目标</div>
      <strong>后量子秘密挡住历史消息</strong>
      <p>KEM 相关秘密不被这个事件直接泄露，代表后量子假设仍成立。</p>
    </div>
  </div>
  <div class="formula-hint"><strong>PQAttackerStart</strong> 触发后，所有非后量子秘密暴露给攻击者。</div>
  <div class="takeaway quantum">有了这个敌手模型，后面的机制才有方向：让 KEM 材料进入能保护消息的密钥链。</div>
</div>

<!--
这页先定义 PQ3 要防的未来敌手。

攻击者今天保存网络消息，未来量子能力成熟后恢复经典公钥相关秘密。

PQAttackerStart 表示这个未来时刻：所有非后量子秘密暴露，KEM 秘密仍按后量子假设保持安全。

转场：面对这个敌手，PQ3 的核心答案是让 KEM 材料进入 root key、chain key 和 message key 的依赖链。

PQAttackerStart模拟的就是"未来量子计算机把椭圆曲线全破了，但格密码还没破"这个时刻。
-->

---
layout: default
---

<div class="deck-slide pq3-keys-slide">
  <h2>1.3 PQ3 的方案：让 KEM 进入消息密钥的来源链</h2>
  <p class="slide-lede">Figure 1 给出了密钥之间的依赖关系；会话启动时，Alice 把经典 ECDH 秘密和后量子 KEM 秘密一起放进第一版状态。</p>
  <div class="slide-grid wide-right">
    <div class="key-layers">
      <div class="key-layer root">
        <div class="key-layer-name">会话根 <span>root key</span></div>
        <p>保存对话积累的秘密；补充新公钥材料时，旧状态和新的 ECDH/KEM 秘密一起派生下一版状态。</p>
      </div>
      <div class="key-layer chain">
        <div class="key-layer-name">消息链 <span>chain key</span></div>
        <p>服务一个发言方向；Alice 连续发消息时，这条链每条消息前进一步。</p>
      </div>
      <div class="key-layer message">
        <div class="key-layer-name">单条消息 <span>message key</span></div>
        <p>真正加密当前消息；用完删除，缩小一次泄露能牵连的范围。</p>
      </div>
      <div class="start-mini-flow">
        <strong>会话启动三步</strong>
        <span>查到 Bob 的 ECDH / KEM 预密钥</span>
        <span>算出经典秘密和后量子秘密</span>
        <span>一起派生第一版 root key 和 chain key</span>
      </div>
      <div class="takeaway pq">key-point：KEM 材料先影响会话根，再影响消息链，最后保护单条消息。</div>
    </div>
    <PaperFigure src="/papers/crops/pq3-fig1-key-dependency.png" label="Figure 1" caption="PQ3 key dependency" source="【USENIX Security'25】PQ3" />
  </div>
</div>

<!--

先看 Figure 1 的一条线：ECDH 和 KEM 秘密进入 root key，root key 影响 chain key，chain key 再生成 message key。

抓一条线：root key 到 chain key，再到 message key。

ECDH 这一侧：
左边是传统椭圆曲线 DH 材料：
- From peer Pub：对方给你的公钥
- From client Priv：你自己的私钥
两者一起做 DH，得到一个经典共享秘密，这就是传统 Signal / iMessage 里常见的 DH 棘轮材料。

右边是后量子 KEM 材料：
- From peer Pub：对方的 KEM 公钥
- From client Priv：自己的 KEM 私钥
图里有两个锁，表示 KEM 的封装 / 解封装过程。最后得到 KEM SS，也就是 KEM shared secret

中间这条横线表示要输入 HKDF 的材料：
- 旧的 rk_i，也就是上一轮 root key
- ECDH 得到的 DH secret
- KEM 得到的 KEM SS
- 如果某一侧材料不存在，就用 0x0 代替

旧 root key + ECDH secret + KEM secret
        ↓
      HKDF
        ↓
新的 root key + 新的 chain key

下方是 HKDF 的输出：
- rk_{i+1}：下一轮 root key，后续会话继续用
- ck_{i,0}：当前发送方向的 chain key
- mk_{i,0}：第一条 message key，用来加密一条消息
- ck_{i,1}：chain key 继续前进，用来派生下一条消息密钥
这张图最重要的结论是：
- KEM 材料进入了 root key 到 message key 的来源链。

攻击者仍然需要跨过 KEM 这一侧，才可能恢复消息密钥。

-->

---
layout: default
---

<div class="deck-slide pq3-refresh-slide">
  <h2>1.4 长期对话的独特性：不断把新材料补进 root key</h2>
  <p class="slide-lede">第一轮混合还不够；当发言方向切换时，PQ3 会用新的公钥材料刷新上层状态。</p>
  <div class="slide-grid wide-left">
    <PaperFigure src="/papers/crops/pq3-fig2-public-key-ratchet.png" label="Figure 2" caption="四个 public-key ratchet step" source="【USENIX Security'25】PQ3" />
    <div class="refresh-explain">
      <div class="paper-kicker">阅读线索</div>
      <div class="refresh-point">
        <strong>会话开始</strong>
        <p>Alice 用 Bob 登记过的预密钥建立第一版会话根。</p>
      </div>
      <div class="refresh-point">
        <strong>有人开始回复</strong>
        <p>发言方向切换时，双方用新的公钥材料派生下一版会话根。</p>
      </div>
      <div class="refresh-point">
        <strong>KEM 会再次进入</strong>
        <p>新的 KEM 公钥和封装结果会周期性进入后续公钥棘轮。</p>
      </div>
      <div class="window-summary">这些刷新发生在不同时间点，攻击者可能在哪个时间点拿到哪些秘密？</div>
    </div>
  </div>
  <div class="takeaway pq">PQ3 的后量子保护伴随对话继续刷新，后续消息会持续获得新的 KEM 材料。</div>
</div>

<!--

图里左边是 Alice，右边是 Bob。每一层是会话状态往前刷新一次。当发言方向切换时，比如 Alice 发完一段，Bob 开始回复，双方会拿新的公钥材料重新派生 root key。这里既有 ECDH 的材料，也有 KEM 的材料。”

因为长期协议里，安全不是一个静态结论。
密钥会不断更新，攻击者也可能在不同时间点拿到不同秘密。
情况 1：攻击者在刷新前拿到旧状态。
- 那它可能追到刷新前的一段消息。

情况 2：新的 KEM 材料已经进 root key 以后，攻击者才拿到旧经典秘密。
- 那旧经典秘密就不一定能推出后面的消息密钥，因为后面的 root key 已经混入了新的 KEM secret。
情况 3：攻击者未来拿到所有 ECDH 相关经典秘密。
- 这正是 HNDL / PQAttack 的设定。PQ3 要证明的是，只要 KEM secret 没被拿到，新的后量子材料能把后续状态重新撑起来。

刷新发生在不同时间点，而泄露也发生在某个时间点。安全边界取决于“泄露发生在刷新之前还是之后”。

这页是在为下一页铺垫：PQ3 的安全性不是只关联 KEM，而是思考 KEM 什么时候进入 root key，攻击者又是在什么时候拿到哪些秘密。
-->

---
layout: default
---

<div class="deck-slide pq3-windows-slide">
  <h2>1.5 泄露会发生在哪？影响是什么？</h2>
  <p class="slide-lede">刷新窗口的意义在这里：同样是密钥泄露，发生在新公钥材料进入之前或之后，会给出完全不同的安全边界。</p>
  <div class="window-lanes">
    <div class="window-lane root">
      <div class="window-speed">泄露之前</div>
      <strong>旧状态会被追溯</strong>
      <p>攻击者拿到仍在影响消息的旧材料时，相关历史窗口就要列入例外。</p>
      <span>边界：哪些旧消息受牵连</span>
    </div>
    <div class="window-lane kem">
      <div class="window-speed">刷新时</div>
      <strong>新 KEM 材料切断追踪</strong>
      <p>新的后量子秘密进入 root key，后面的消息可以离开旧经典秘密的影响。</p>
      <span>边界：恢复从哪里开始</span>
    </div>
    <div class="window-lane msg">
      <div class="window-speed">刷新之后</div>
      <strong>攻击者要重新追新状态</strong>
      <p>消息链继续前进，用过的消息密钥删除，新的会话状态成为验证对象。</p>
      <span>边界：后续消息是否恢复</span>
    </div>
  </div>
  <div class="window-summary">验证时的核心问题：泄露发生在刷新之前，还是刷新之后？这直接对应前向保密和泄露后恢复。</div>
  <div class="takeaway">机制到此变成验证问题：攻击者在哪一刻拿到哪些秘密，直接决定保密程度的条件。</div>
</div>

<!--
这一页从机制进入验证。泄露发生在刷新之前、刷新时、刷新之后，会决定哪些消息进入失败例外，哪些后续消息应该恢复安全。

这里的 lemma 可以先理解成验证工具要证明的一条安全断言：如果没有发生指定的泄露例外，攻击者就不应该知道消息。那这一页就是在解释这些例外从哪里来。同样是泄露，发生在刷新前、刷新时、刷新后，影响范围完全不一样。刷新前泄露，旧消息可能受牵连；刷新时新的 KEM 材料进 root key，后面的状态有机会切断旧经典秘密的影响；刷新后消息链继续前进，用过的 message key 删除。于是 PQ3 的保密证明不是简单说‘泄露了也安全’，而是精确写清楚：哪一刻泄露了哪些秘密，哪些消息还应该保密，哪些消息只能列为例外。

新 KEM 材料进来之前，旧状态可能被追；进来之后，后面的消息有机会恢复安全。
-->

---
layout: default
---

<div class="deck-slide pq3-model-slide">
  <h2>1.6 PQ3 的模型同时放进正常聊天和未来泄露</h2>
  <p class="slide-lede">论文把聊天步骤、密钥刷新、密钥泄露和未来量子事件都写进同一个状态机；工具搜索这些步骤任意交错时有没有坏路径。</p>
  <div class="slide-grid wide-left">
    <PaperFigure src="/papers/crops/pq3-fig3-model-overview.png" label="Figure 3" caption="formal model overview" source="【USENIX Security'25】PQ3" />
    <div class="model-reading">
      <div class="paper-kicker">读图顺序</div>
      <div class="model-reading-card">
        <strong>先看中间：会话状态</strong>
        <p>发送端和接收端各自保存当前密钥、计数器和消息方向。</p>
      </div>
      <div class="model-reading-card">
        <strong>再看两侧：允许的动作</strong>
        <p>发消息、收消息、刷新密钥、删除旧材料都被写成可执行步骤。</p>
      </div>
      <div class="model-reading-card">
        <strong>最后看下方：未来泄露事件</strong>
        <p>经典秘密全泄露的事件和正常聊天放在同一个模型里搜索。</p>
      </div>
    </div>
  </div>
  <div class="takeaway formal">Tamarin 检查聊天、刷新和泄露的不同组合。</div>
</div>

<!--

“这张图就是 PQ3 的状态机地图。中间是会话状态，两边是正常聊天和刷新动作，下面是未来经典秘密泄露事件。Tamarin 会把这些步骤任意组合，然后问：有没有一种顺序，会让攻击者知道本来不该知道的消息？”

中间蓝色大框里的 Session，可以理解成当前聊天会话状态。里面保存的是双方当前的密钥、计数器、消息方向这些东西。也就是说，PQ3 不是只验证一条消息，而是验证一个会不断更新的会话状态。

两边的蓝色框是Tamarin 里的 rule也就i是协议允许走的一步。工具会把这些步骤按各种顺序组合起来。不是只跑 happy path。

下面的 PQAttackerStart 和 PQAttacker 就是未来泄露事件。工具不是先验证正常聊天，再单独讨论泄露；它会把聊天、刷新、删除、未来泄露全部放在一起搜索。所以攻击者可能在某个会话阶段之后出现，也可能在某次刷新之后出现。这就对应前面那页讲的：泄露到底发生在哪个时间点。

重点是说明论文把正常聊天、密钥刷新和未来经典秘密泄露放进同一个可搜索模型。

这样 Tamarin 才能检查：泄露发生在不同时间点时，历史消息是否仍然安全。
转场：模型建好以后，要看它到底证明了哪些性质，先从保密边界读起。

-->

---
layout: default
---

<div class="deck-slide pq3-secrecy-slide">
  <h2>1.7 一个保密性 lemma 同时表达三种安全边界</h2>
  <p class="slide-lede">论文把消息保密、前向保密和泄露后恢复用同一个框架给出不同泄露条件。</p>
  <div class="slide-grid wide-left">
    <PaperFigure src="/papers/crops/pq3-fig4-secrecy-lemma.png" label="Figure 4" caption="secrecy lemma" source="【USENIX Security'25】PQ3" />
    <div class="property-reading">
      <div class="property-step">
        <span>1</span>
        <div><strong>先指定一条消息</strong><p>这条消息由诚实会话发出。</p></div>
      </div>
      <div class="property-step">
        <span>2</span>
        <div><strong>默认结论：敌手不知道</strong><p>网络攻击下，消息内容不应进入敌手知识。</p></div>
      </div>
      <div class="property-step">
        <span>3</span>
        <div><strong>列出失败窗口</strong><p>相关密钥或特定握手秘密泄露时，结论允许失效。</p></div>
      </div>
      <div class="secrecy-unifier">
        <strong>同一个框架读三种性质</strong>
        <p>消息保密：不泄露相关材料。</p>
        <p>前向保密：未来泄露不影响过去消息。</p>
        <p>泄露后恢复：新公钥材料进入后，后续消息重新安全。</p>
      </div>
    </div>
  </div>
  <div class="takeaway formal">三种保密性质——消息保密、前向保密、泄露后恢复——对这一个 lemma 来说，只是泄露条件不同。</div>
</div>

<!--
PQ3 的保密性证明，不是简单说“消息永远不会泄露”，而是精确写出：什么情况下消息应该保密，什么泄露情况下允许失败

选中一条诚实发送的消息，默认敌手不知道；只有列出的泄露组合发生时，结论才允许失败。

用一套泄露条件同时表达消息保密、前向保密和泄露后恢复。

消息保密对应没有相关材料泄露；前向保密对应未来泄露不影响过去消息；泄露后恢复对应新公钥材料进入后，后续消息重新安全。
转场：保密性之外，消息协议还要证明收到的消息确实来自对方。

一个 secrecy lemma 先指定一条诚实发送的消息，然后给出默认结论：攻击者不知道这条消息。后面那一大串 Reveal 条件，就是允许失败的泄露窗口。比如消息密钥泄露了，那当然不能再要求这条消息保密；相关 chain key 或 root key 在关键时间泄露，也会进入例外。PQ3 的关键是，它把消息保密、前向保密、泄露后恢复放进同一个框架里。区别只在于：哪些泄露算例外，哪些泄露不应该影响这条消息。
-->

---
layout: default
---

<div class="deck-slide pq3-agreement-slide">
  <h2>1.8 认证性：我收到的消息真是你发的吗？</h2>
  <p class="slide-lede">消息保密只说明别人看不懂；聊天协议还要保证接收方没有被冒名消息或重放消息骗过。</p>
  <div class="slide-grid wide-left">
    <PaperFigure src="/papers/crops/pq3-fig7-8-agreement.png" label="Figures 7–8" caption="agreement lemmas" source="【USENIX Security'25】PQ3" />
    <div class="agreement-checks">
      <div class="agreement-check">
        <strong>能对应到一次发送吗？</strong>
        <p>每个接收事件都要找到一个更早的发送事件，双方同意发送者、接收者、计数器和认证数据。</p>
        <span>agreement</span>
      </div>
      <div class="agreement-check">
        <strong>同一条消息会被收两次吗？</strong>
        <p>强一点的结论要求一次发送最多对应一次接收，用来表达重放保护。</p>
        <span>injective agreement</span>
      </div>
      <div class="agreement-check warning">
        <strong>边界在哪里？</strong>
        <p>发送方长期身份密钥泄露会破坏认证；会话开始消息还依赖应用层处理。</p>
        <span>assumption</span>
      </div>
    </div>
  </div>
  <div class="takeaway proto">形式化验证的好处在这里：它把协议能保证的部分和应用层要接住的部分分开。</div>
</div>

<!--
保密解决“别人看不看得懂”。认证说的另一件事：我收到的消息，真是你发的吗？也就是重放问题。
右边第一块 agreement 要求每个接收事件都能找到一个更早的发送事件，并且双方同意发送者、接收者、计数器和认证数据。

第二块 injective agreement 更强，它要求一次发送最多对应一次接收，所以可以表达重放保护。

最后这块是边界：如果发送方长期身份密钥已经泄露，认证当然会坏；会话开始消息还依赖应用层处理。形式化验证的价值就是把这些保证和边界分开。

-->

---
layout: default
---

<div class="deck-slide pq3-proof-slide">
  <h2>1.9 Tamarin 也能处理嵌套循环协议</h2>
  <p class="slide-lede">PQ3 不只是在证明 iMessage；它也给形式化验证社区一个信号：真实的双棘轮式循环协议并不一定超出符号验证器能力。</p>
  <div class="proof-grid">
    <div class="proof-problem">
      <div class="paper-kicker">问题一</div>
      <strong>会话影子太多</strong>
      <p>攻击者构造出的相似会话会让工具反复追踪不可能成立的路径。</p>
    </div>
    <div class="proof-problem">
      <div class="paper-kicker">问题二</div>
      <strong>循环层层嵌套</strong>
      <p>消息循环套着公钥刷新循环，过去常被认为很难交给符号验证器处理。</p>
    </div>
    <div class="proof-problem">
      <div class="paper-kicker">问题三</div>
      <strong>变量关系要补齐</strong>
      <p>工具需要额外知道哪些状态变量必须来自同一轮会话。</p>
    </div>
  </div>
  <div class="proof-aid">方法论可以复用：用可注入状态事实和归纳式辅助结论，把嵌套循环压成工具能证明的路径。</div>
  <div class="takeaway formal">PQ3 的第二个贡献是证明工程方法：Tamarin 的能力边界比很多人以为的更远。</div>
</div>

<!--
这个数字背后是证明工程。
真实双棘轮协议有很多相似会话，工具很容易绕进去。
论文的贡献是给 Tamarin 加路标，让它别在无效路径里打转。

这页把论文第二个贡献说出来：它不只是验证了 PQ3，也展示 Tamarin 可以处理复杂的嵌套循环协议。
过去很多人会觉得 Signal 这类 unbounded looping protocols 超出符号验证器范围，PQ3 论文用证明工程把这件事往前推了一步。
方法上可以讲成两类工具：可注入状态事实帮助绑定会话关系，归纳式辅助结论帮助工具跨过循环。
转场：最后用成本和边界收束 PQ3 case。

-->

---
layout: default
---

<div class="deck-slide pq3-wrap-slide">
  <h2>PQ3 的价值：安全边界清楚，方法边界也被推进</h2>
  <p class="slide-lede">这一篇要带走两件事：它证明了 PQ3 在模型内的保密和认证边界，也展示了 Tamarin 可以处理更复杂的循环协议。</p>
  <div class="wrap-grid">
    <div class="wrap-card effort">
      <div class="paper-kicker">证明成本</div>
      <strong>32 个性质和辅助结论</strong>
      <p>强认证证明耗费约 7 小时、20GB 内存；部分保密和泄露相关证明最高约 100GB 内存。</p>
    </div>
    <div class="wrap-card covered">
      <div class="paper-kicker">论文覆盖范围</div>
      <strong>设备到设备消息协议设计</strong>
      <p>结论覆盖符号模型下的机密性、认证、前向保密和泄露后恢复。</p>
    </div>
    <div class="wrap-card boundary">
      <div class="paper-kicker">方法信号</div>
      <strong>嵌套循环可以被证明工程驯服</strong>
      <p>可注入状态事实和归纳式辅助结论，把真实协议的循环结构带进 Tamarin。</p>
    </div>
  </div>
</div>

<!--
PQ3 case 用这一页收束：它同时给出证明成本和适用边界。
32 个 lemma、7 小时、20GB/100GB 这些数字说明复杂协议的验证也是工程工作。
方法贡献也要点出来：Tamarin 能处理之前常被认为很难处理的嵌套循环协议。
边界仍然重要：符号模型证明的是协议设计层，不自动覆盖实现、群聊和底层 cipher 细节。
转场：接下来换一个完全不同的场景，VPN 握手很短，但 KEM 替换 DH 的语义问题更尖锐。

-->

---
layout: default
---

<div class="section-slide">
  <div class="section-kicker">Case B · Hybrid-WireGuard【USENIX Security'25】</div>
  <h1 class="section-title">Hybrid-WireGuard：两条握手消息里重建身份绑定</h1>
  <div class="section-points">
    <p>原 WireGuard 用 DH 同时完成密钥协商、身份绑定和前向保密。</p>
    <p>论文先修复 PQ-WireGuard，得到 PQ-WireGuard⋆，再构造经典与后量子的混合握手。</p>
    <p>核心结论：攻击者必须同时攻破经典侧和后量子侧，才能破坏混合方案的安全性质。</p>
  </div>
</div>

<!--
第二个 case，WireGuard。这个和前面的pq3形成了鲜明对比。

WireGuard 是一个极简 VPN 握手，只有两条 UDP 握手消息，很多安全语义都在 DH 材料和派生链里。

论文的出发点是：早期 PQ-WireGuard 尝试用 KEM 替代 DH，但 KEM 和 DH 的“说话方式”不同，直接替换会带来身份、角色和匿名性问题。

转场：先看 WireGuard 里 DH 到底做了几件事。

WireGuard 太小了：只有两条握手消息，但 DH 在里面同时负责密钥、身份、新鲜性和上下文绑定；所以把 DH 换成 KEM 时，问题不是“加一个后量子算法”，而是要重新证明这些语义还在

-->

---
layout: default
---

<div class="deck-slide wg-dh-slide">
  <h2>2.1 DH 在 WireGuard 中的三个责任</h2>
  <p class="slide-lede">DH 同时参与密钥、身份和握手记录，KEM 迁移比较麻烦。</p>
  <div class="wg-dh-grid">
    <div class="wg-dh-card identity">
      <div class="paper-kicker">身份</div>
      <strong>静态公钥代表对端是谁</strong>
      <p>静态 DH 材料会把共享秘密和 peer 身份绑在一起。</p>
    </div>
    <div class="wg-dh-card secrecy">
      <div class="paper-kicker">及时性</div>
      <strong>临时公钥提供前向保密</strong>
      <p>每次握手的新临时材料限制长期密钥泄露后的历史影响。</p>
    </div>
    <div class="wg-dh-card transcript">
      <div class="paper-kicker">上下文锁定</div>
      <strong>消息记录进入派生链</strong>
      <p>握手里的公钥、密文和方向会进入哈希链，防止材料被挪到别的会话。</p>
    </div>
  </div>
  <div class="wg-constraint">两条 UDP 握手消息，IPv6 MTU 1280 字节，不能分片。这意味着换 KEM 时不能随便塞大公钥进去。</div>
</div>

<!--
DH 在 WireGuard 里一口气干三件事。
静态材料说“你是谁”，临时材料说“这次是新的”，消息记录说“这些东西属于同一次握手”。
KEM 进来后，这三件事都要补回去。
-->

---
layout: default
---

<div class="deck-slide kem-static-slide">
  <h2>2.2 KEM 和 DH 语义差异</h2>
  <p class="slide-lede">WireGuard 的 DH 可以自然组合双方静态和临时公钥；KEM 只能由一方封装给某个接收方，这会改变身份绑定方式。</p>
  <div class="semantic-compare">
    <div class="semantic-card dh-side">
      <div class="paper-kicker">DH 的语义</div>
      <strong>双方材料自然组合</strong>
      <p>静态-静态、静态-临时、临时-静态、临时-临时这些组合都能算出共享秘密。</p>
      <div class="semantic-note">身份绑定可以藏在静态公钥组合里。</div>
    </div>
    <div class="semantic-card kem-side">
      <div class="paper-kicker">KEM 的语义</div>
      <strong>发送方面向接收方封装</strong>
      <p>封装者看见接收方公钥，产生密文和共享秘密；接收方用私钥解封装。</p>
      <div class="semantic-note">“两个静态 KEM 公钥直接算秘密”这一步不存在。</div>
    </div>
  </div>
  <div class="formula-hint">论文里的公式可以晚一点再看；这一页只记住方向变化：<strong>对称共同计算 → 单向封装给接收方</strong></div>
  <div class="takeaway hybrid">Hybrid-WireGuard 的修正重点，就是把 KEM 的单向秘密重新绑回身份、方向和握手上下文。</div>
</div>

<!--
这里看 KEM 的别扭之处。

DH 的四类组合天然来自双方公私钥，尤其静态材料能参与身份绑定。

KEM 是单向封装：一方向另一方公钥生成密文和共享秘密，没有两个静态 KEM 公钥自然算出共享秘密这件事。

两个静态 KEM 公钥没法像 DH 那样直接一起算。

后面的修复都围着这个问题转。

-->

---
layout: default
---

<div class="deck-slide wg-evolution-slide">
  <h2>2.3 WireGuard演化路线</h2>
  <p class="slide-lede">分析原协议问题 -> 分析第一次迁移出现的问题 -> 给出 PQ-WireGuard⋆ 以及构造混合方案。</p>
  <div class="evolution-rail">
    <div class="evolution-step base">
      <div class="paper-kicker">WireGuard</div>
      <strong>DH 主导握手</strong>
      <p>身份、新鲜性和密钥派生都围绕 DH 材料组织。</p>
    </div>
    <div class="rail-arrow">→</div>
    <div class="evolution-step pqwg">
      <div class="paper-kicker">PQ-WireGuard</div>
      <strong>首次把 KEM 放进握手</strong>
      <p>引入抗量子材料，但是暴露出角色、封装语义和匿名性问题。</p>
    </div>
    <div class="rail-arrow">→</div>
    <div class="evolution-step fix">
      <div class="paper-kicker">PQ-WireGuard⋆</div>
      <strong>修正封装、身份和匿名性</strong>
      <p>把 KEM 秘密、静态身份和握手上下文重新绑定。</p>
    </div>
    <div class="rail-arrow">→</div>
    <div class="evolution-step hybrid">
      <div class="paper-kicker">Hybrid-WireGuard</div>
      <strong>经典与后量子一起绑定</strong>
      <p>双保险：保留经典 DH 兜底，同时加入 KEM 抵抗未来量子攻击。</p>
    </div>
  </div>
  <div class="takeaway formal">接下来读每张方案表时，只追两件事：消息里新增了什么材料，新增材料怎样进入密钥派生。</div>
</div>

<!--
这张路线图别当论文目录看。
它是在说：先发现 PQ-WireGuard 的问题，再修成 PQ-WireGuard⋆，最后才做 Hybrid。
顺序很重要。

这页把论文里的多张设计表翻译成一条演化路线。
从左到右讲四步：WireGuard、PQ-WireGuard、PQ-WireGuard⋆、Hybrid-WireGuard。
后面如果看表格，只追两个问题：消息里新增了什么，新增材料怎样进入密钥派生。
转场：为什么需要修正？下一页讲 PQ-WireGuard⋆ 的三处修复。

-->

---
layout: default
---

<div class="deck-slide wg-fix-slide">
  <h2>2.4 PQ-WireGuard⋆ 修复三处语义漏洞</h2>
  <p class="slide-lede">论文先解决 PQ-WireGuard 存在的问题</p>
  <div class="fix-grid">
    <div class="fix-card role">
      <div class="paper-kicker">UKS 修复</div>
      <strong>静态公钥哈希进入密钥派生</strong>
      <p>会话密钥显式绑定双方静态身份，角色切换不再制造“同钥不同人”的理解差异。</p>
      <p>Unknown Key-Share，未知密钥共享攻击。意思是双方算出了同一把会话密钥，但对“这把 key 是和谁共享的”理解不一致。</p>
      <span>HASH(S_i, S_r) → KDF context</span>
    </div>
    <div class="fix-card kem">
      <div class="paper-kicker">KEM 修复</div>
      <strong>移除 deterministic encapsulation</strong>
      <p>封装过程回到标准随机 KEM，用真实 KEM 语义替代“模拟 DH”的确定性封装。</p>
      <span>deterministic Encaps → randomized KEM</span>
    </div>
    <div class="fix-card anon">
      <div class="paper-kicker">匿名性修复</div>
      <strong>InitHello 中加密 KEM 密文 ct₁</strong>
      <p>网络观察者不能直接从第一条握手消息识别通信方，匿名性也进入可验证目标。</p>
      <span>ct₁ protected in InitHello</span>
    </div>
  </div>
  <div class="fix-summary">修正后的 PQ-WireGuard⋆ 同时覆盖 UKS 抵抗、标准 KEM 语义、匿名性、前向保密和会话密钥保密。</div>
  <div class="takeaway">Hybrid-WireGuard 从已经修过的 PQ-WireGuard⋆ 出发，再叠加经典 DH 防线。</div>
</div>

<!--
这页讲 PQ-WireGuard⋆ 的三处修复，把它和早期 PQ-WireGuard 区分开。

第一，让密钥和身份绑定。会话密钥不能只是由秘密材料算出来，还要明确绑定“这把 key 属于哪两个静态身份”。所以论文把双方静态公钥哈希进派生链，防止同钥不同人的情况。

第二，回到标准随机 KEM。早期 PQ-WireGuard 为了模仿 DH，做了某种 deterministic encapsulation，也就是封装过程更像“给定输入就固定输出”。问题是：这已经偏离标准 KEM 的安全语义了。形式化验证和真实 KEM 安全假设通常都建立在随机封装上。

第三处修的是匿名性。第一条 InitHello 是网络观察者最容易看到的地方。如果 KEM 密文裸露在这里，它可能变成识别通信方的线索。所以修正版把 ct₁ 也保护起来，让匿名性进入验证目标。

这三处修完之后，PQ-WireGuard⋆ 才是一个更干净的后量子侧。后面的 Hybrid-WireGuard 就是在这个基础上，再叠加经典 DH 防线。
-->

---
layout: default
---

<div class="deck-slide wg-hybrid-slide">
  <h2>2.5 Hybrid-WireGuard</h2>
  <p class="slide-lede">最终方案同时运行 WireGuard 的 DH 派生链和 PQ-WireGuard⋆ 的 KEM 派生链，再把两侧秘密合进最终 KDF。</p>
  <div class="hybrid-chain">
    <div class="chain-step classic">
      <div class="paper-kicker">经典侧</div>
      <strong>DH 秘密进入派生</strong>
      <p>保留 WireGuard 原来的经典安全兜底和前向保密结构。</p>
    </div>
    <div class="chain-plus">+</div>
    <div class="chain-step pq">
      <div class="paper-kicker">后量子侧</div>
      <strong>KEM 秘密进入派生</strong>
      <p>新增抗量子秘密，未来量子攻击不能只靠破解 DH 还原会话。</p>
    </div>
    <div class="chain-plus">+</div>
    <div class="chain-step context">
      <div class="paper-kicker">绑定材料</div>
      <strong>身份哈希、方向和预共享密钥一起进入</strong>
      <p>把新增材料和同一轮握手上下文绑牢。</p>
    </div>
  </div>
  <div class="hybrid-cnf">
    <div class="cnf-formula">Break(Hybrid, property) = Break(WireGuard, property) ∧ Break(PQ-WireGuard⋆, property)</div>
    <div class="cnf-plain">单独攻破经典侧或 PQ 侧都不够；攻击者必须同时跨过两边。</div>
  </div>
  <div class="takeaway hybrid">Table 6 把“混合安全”落成可检查结论：每个安全性质的破坏条件都是两侧合取。</div>
</div>

<!--

这一页是 Hybrid-WireGuard 的核心。最终方案同时跑两条派生链：一条是 WireGuard 原来的 DH，一条是修复后的 PQ-WireGuard⋆ 的 KEM。然后它把身份哈希、方向和预共享密钥这些上下文一起放进最终 KDF。  这样做的结果就是下面这个公式：要破 Hybrid，要同时破 WireGuard 和 PQ-WireGuard⋆。所以这篇论文说的混合安全，是一个可验证的合取条件。

-->

---
layout: default
---

<div class="deck-slide wg-tools-slide">
  <h2>2.6 形式化证明：针对不同问题使用多个工具</h2>
  <p class="slide-lede">一个验证器很难同时擅长所有任务：有的工具适合快速扫路径，有的适合处理 DH 代数，有的适合检查匿名性。</p>
  <div class="tool-chain-grid">
    <div class="tool-chain-card spec">
      <div class="paper-kicker">先写一份规范</div>
      <strong>把握手写成可翻译模型</strong>
      <p>SAPIC+ 作为中间表示，让同一个协议描述能送到不同工具。</p>
    </div>
    <div class="tool-chain-card fast">
      <div class="paper-kicker">快速扫描</div>
      <strong>先找大量路径和泄露组合</strong>
      <p>ProVerif 适合快速跑查询，先给出候选结论和破坏条件。</p>
    </div>
    <div class="tool-chain-card algebra">
      <div class="paper-kicker">代数结构</div>
      <strong>再处理 DH 相关推理</strong>
      <p>Tamarin 更适合处理 Diffie-Hellman 这类带代数结构的协议步骤。</p>
    </div>
    <div class="tool-chain-card equiv">
      <div class="paper-kicker">可区分性</div>
      <strong>最后检查匿名性类问题</strong>
      <p>DeepSec 用来确认观察者是否能分辨两种执行。</p>
    </div>
  </div>
  <div class="speed-note">自适应评估把 4860 个查询压到不到 30 个；混合方案面对 2³⁵ 种泄露组合时，这一步让分析从不可承受变成可运行。</div>
  <div class="takeaway formal">多工具的作用是把不同安全问题交给更合适的检查器。</div>
</div>

<!--
多工具不是炫技。
ProVerif 跑得快，Tamarin 会处理 DH 代数，DeepSec 看匿名性。
4860 个查询压到不到 30 个。这个数字值得停一下。

这页说明工具选择和安全性质之间的关系。
SAPIC+ 的意义是写一份规范，再生成 ProVerif、DeepSec、Tamarin 等工具能处理的模型。
不同工具各有所长：ProVerif 快，DeepSec 帮助等价性质，Tamarin 更适合处理 DH 代数结构。
自适应评估是这里的工程贡献：先找最小泄露集合，再删掉所有超集。
论文给出的数字很直观：原来 4860 个查询压到不到 30 个；部分分析从 15 分钟、2.5 小时、1.5 小时降到 5 秒、2 分 45 秒、2 秒。
转场：有了多工具分析，最关键的证据仍然回到 Table 6。

-->

---
layout: default
---

<div class="deck-slide wg-results-slide">
  <h2>2.7 Hybrid结果</h2>
  <p class="slide-lede">Table 6 回答泄露程度和协议安全的关系</p>
  <div class="slide-grid wide-left">
    <PaperFigure src="/papers/crops/wg-table6-symbolic-results.png" label="Table 6" caption="symbolic analysis results" source="【USENIX Security'25】Hybrid-WireGuard" />
    <div class="result-reading">
      <div class="result-card ok">
        <div class="result-symbol">✓</div>
        <strong>模型内成立</strong>
        <p>在给定攻击能力下，工具没有找到破坏该性质的执行路径。</p>
      </div>
      <div class="result-card fail">
        <div class="result-symbol">✗</div>
        <strong>设计不满足</strong>
        <p>模型能找到失败路径，说明该方案本身没有达到这个性质。</p>
      </div>
      <div class="result-card condition">
        <div class="result-symbol">A ∧ B</div>
        <strong>失败需要组合泄露</strong>
        <p>攻击者必须同时拿到列出的秘密；单独泄露一份材料还不够。</p>
      </div>
      <div class="result-card hybrid">
        <div class="result-symbol">Hybrid</div>
        <strong>经典侧条件 ∧ PQ 侧条件</strong>
        <p>混合列把 WireGuard 与 PQ-WireGuard⋆ 的破坏条件合在一起。</p>
      </div>
    </div>
  </div>
  <div class="takeaway formal">Table 6 是机制修复变成可检查结论的落点：修正后的混合方案把两侧失败条件做合取。</div>
</div>

<!--
表的行是安全性质，列是不同协议版本。勾号表示模型内成立，叉号表示设计达不到；真正重要的是中间这些逻辑条件。  
A ∧ B 的意思是，攻击者要同时拿到 A 和 B，单独泄露一份材料还不够。
Hybrid 列就是这篇论文最关键的证据：它把 WireGuard 侧的破坏条件和 PQ-WireGuard⋆ 侧的破坏条件做合取。  
前面提到的“单破一边不够”，不是口头判断，而是 Table 6 里逐个性质算出来的结果。
-->

---
layout: default
---

<div class="deck-slide wg-engineering-slide">
  <h2>2.8 工程实现上的约束</h2>
  <p class="slide-lede">WireGuard 跑在 UDP 上，握手消息大小、MTU 和实现性能会直接决定方案能不能部署。</p>
  <div class="engineering-grid">
    <div class="engineering-card size">
      <div class="paper-kicker">MTU 约束</div>
      <strong>握手仍要塞进 1280 字节</strong>
      <p>IPv6 MTU 让临时 KEM 材料不能随便变大；消息过大就会触发分片风险。</p>
    </div>
    <div class="engineering-card choice">
      <div class="paper-kicker">算法选择</div>
      <strong>静态 KEM 用 Classic McEliece</strong>
      <p>公钥很大，但作为长期密钥不频繁传输；临时 KEM 更受握手包大小约束。</p>
    </div>
    <div class="engineering-card perf">
      <div class="paper-kicker">实现性能</div>
      <strong>本地握手仍在毫秒级</strong>
      <p>论文 Rust 实现里，初始化和响应路径都保持在可部署的延迟范围。</p>
    </div>
  </div>
</div>

<!--
前面我们看的是形式化验证结果，但 WireGuard 不能只在模型里安全。它跑在 UDP 上，握手消息很小，所以后量子材料一加进来，马上遇到包大小问题。  
第一，IPv6 最小 MTU 是 1280 字节，握手包太大就可能分片。WireGuard 的部署场景不太能接受这种不稳定。  
第二，这会影响 KEM 选择。Classic McEliece 公钥很大，但如果作为静态长期密钥，不频繁传输，还能接受；真正麻烦的是临时 KEM，因为它更容易进入每次握手包。  
第三，论文还给了 Rust 实现，说明握手延迟仍然在毫秒级。  
所以这页是在把前面的安全结论拉回现实：协议证明安全以后，还要看包大小和性能能不能撑住部署。
-->

---
layout: default
---

<div class="deck-slide wg-summary-slide">
  <h2>2.9 WireGuard 的主线：验证推动设计修正</h2>
  <p class="slide-lede">它先分析现有迁移方案并发现问题，再修成 PQ-WireGuard⋆，最后把混合方案放回工具里检查。</p>
  <div class="summary-steps">
    <div class="summary-step find">
      <div class="step-num">1</div>
      <strong>先让模型更严格</strong>
      <p>允许角色切换和更多泄露组合，暴露身份理解不一致的问题。</p>
    </div>
    <div class="summary-step repair">
      <div class="step-num">2</div>
      <strong>再得到 PQ-WireGuard⋆</strong>
      <p>回到标准 KEM 用法，把身份材料和匿名性保护补回握手。</p>
    </div>
    <div class="summary-step verify">
      <div class="step-num">3</div>
      <strong>最后验证 Hybrid-WireGuard</strong>
      <p>经典 DH 和后量子 KEM 同时进入两消息握手，破坏条件变成两侧合取。</p>
    </div>
  </div>
  <div class="takeaway">这篇论文最值得带走的是“验证驱动的协议修正链条”。</div>
</div>

<!--
主线其实很清楚：验证推动设计修正。  

论文先找到早期 PQ-WireGuard 里身份理解不一致的问题。  

第二步，发现问题以后，论文先修 PQ-WireGuard，得到 PQ-WireGuard⋆。这里包括回到标准随机 KEM，把静态身份放进派生链，还有补匿名性。  

第三步，最后才验证 Hybrid-WireGuard。经典 DH 和后量子 KEM 同时进入握手，Table 6 给出的结论是：破坏条件变成两侧合取。  

-->

---
layout: default
---

<div class="section-slide">
  <div class="section-kicker">Case C · PQConnect【NDSS'25】</div>
  <h1 class="section-title">PQConnect：应用不改，网络层自动建立后量子隧道</h1>
  <div class="section-points">
    <p>TLS 花了 20 年才覆盖约 80% 网页；逐个协议集成后量子 TLS 的速度追不上迁移压力。</p>
    <p>PQConnect 选择另一条路径：在网络层自动发现对端，并给应用流量加第二道后量子保护。</p>
  </div>
</div>

<!--
第三个 case，PQConnect。
它干脆往下走，在网络层自动加一道后量子保护。
-->

---
layout: default
---

<div class="deck-slide">
  <h2>PQConnect：不改应用，客户端自动建隧道</h2>
  <p class="slide-lede">应用仍然发普通网络请求；PQConnect 在主机网络层完成发现、取钥、握手和流量重写。</p>
  <div class="pqc-workflow">
    <div class="pqc-flow-card dns">
      <div class="paper-kicker">1 · DNS CNAME</div>
      <strong>发现 <code>pq1</code> 支持信号</strong>
      <p>名字里携带服务器长期公钥哈希，非 PQConnect 服务器保持普通查询路径。</p>
    </div>
    <div class="pqc-flow-card keyserver">
      <div class="paper-kicker">2 · DNS TXT</div>
      <strong>定位 keyserver</strong>
      <p>客户端拿到 keyserver 地址和端口，再获取长期公钥与临时公钥。</p>
    </div>
    <div class="pqc-flow-card merkle">
      <div class="paper-kicker">3 · Merkle tree</div>
      <strong>流式验证 1MB 长期公钥</strong>
      <p>大公钥分片下载、逐片验证，缓存后供后续连接复用。</p>
    </div>
    <div class="pqc-flow-card ephemeral">
      <div class="paper-kicker">4 · 30s keys</div>
      <strong>获取临时公钥并预计算</strong>
      <p>临时 sntrup761 公钥按时间轮换，客户端可提前算好 KEM 密文。</p>
    </div>
    <div class="pqc-flow-card tunnel">
      <div class="paper-kicker">5 · 0-RTT handshake</div>
      <strong>嵌套握手建立隧道</strong>
      <p>第一条握手消息即可携带加密数据；取钥成本不算进握手 RTT。</p>
    </div>
    <div class="pqc-flow-card traffic">
      <div class="paper-kicker">6 · Traffic rewrite</div>
      <strong>本机网络层重写流量</strong>
      <p>应用继续使用原网络 API，主机把包导入 PQConnect 本地地址空间。</p>
    </div>
  </div>
  <div class="takeaway proto">PQConnect 展示的是第三种迁移架构：把后量子保护放到网络层透明隧道。</div>
</div>

<!--
这张流程图信息很多，按编号走就行。
先 DNS 发现，再找 keyserver，再取长期和临时公钥，然后做 0-RTT 握手。
最后一步很关键：应用不用知道这些，流量在本机被重写。
-->

---
layout: default
---

<div class="deck-slide pqc-dns-slide">
  <h2>客户端先靠 DNS 判断：这个服务器能不能走隧道</h2>
  <p class="slide-lede">DNS 让自动发现变得轻量，也把服务器支持信号和 key hash 绑定放进了一个必须审计的入口。</p>
  <div class="dns-flow">
    <div class="dns-card discover">
      <div class="paper-kicker">发现</div>
      <strong>DNS 响应里出现支持信号</strong>
      <p>CNAME 名字组件以 <code>pq1</code> 开头，后面跟 52 个 DNSCurve alphabet 符号。</p>
    </div>
    <div class="dns-card map">
      <div class="paper-kicker">绑定</div>
      <strong>名字携带服务器长期公钥哈希</strong>
      <p>客户端把“这个服务器支持 PQConnect”和“应该取哪把长期公钥”连起来。</p>
    </div>
    <div class="dns-card risk">
      <div class="paper-kicker">攻击面</div>
      <strong>DNS 替换会影响 key hash 绑定</strong>
      <p>论文分析 DNSSEC 限制、rebinding、QUANTUMINSERT 等风险和部署缓解。</p>
    </div>
  </div>
  <div class="takeaway">DNS 让 PQConnect 自动发现成立，也成为这套网络层方案最需要标清的部署边界。</div>
</div>

<!--
DNS 这一步很方便，也很脆。
pq1 告诉客户端“可以走 PQConnect”，key hash 又告诉它该拿哪把公钥。
如果 DNS 被替换，后面整条链都会受影响。
所以这是部署边界，不只是发现机制。
-->

---
layout: default
---

<div class="deck-slide pqc-handshake-slide">
  <h2>0-RTT 握手的关键是嵌套保护</h2>
  <p class="slide-lede">四把公钥不是并排放进 KDF；外层派生出的密钥会加密保护内层操作，让保守外层给快速内层兜底。</p>
  <div class="slide-grid wide-left">
    <PaperFigure src="/papers/crops/pqc-fig1-handshake.png" label="Figure 1" caption="PQConnect handshake component" source="【NDSS'25】PQConnect" />
    <div class="handshake-reading">
      <div class="handshake-point">
        <strong>McEliece</strong>
        <p>长期后量子保护 + 服务器身份；保守外层先建立第一道防线。</p>
      </div>
      <div class="handshake-point">
        <strong>X25519</strong>
        <p>经典混合 + 会话新鲜性；成熟 DH 材料被外层保护后进入派生链。</p>
      </div>
      <div class="handshake-point">
        <strong>SNTRUP</strong>
        <p>临时后量子 + 快速擦除；内层 KEM 生成可快速删除的隧道密钥。</p>
      </div>
      <div class="nested-note">
        <strong>Nested</strong>
        <p>内层密文被外层派生密钥加密后发送；内层出问题时，外层 McEliece 仍提供保护。</p>
      </div>
    </div>
  </div>
  <div class="takeaway pq">PQConnect 的握手重点是嵌套：保守的大公钥在外层，快速擦除材料在内层。</div>
</div>

<!--
这张图的关键词是嵌套。
McEliece 在外层，慢一点、大一点，但稳；X25519 和 SNTRUP 在里面，负责新鲜性和快速擦除。
外层先兜住，内层再跑快。
-->

---
layout: default
---

<div class="deck-slide pqc-keyserver-slide">
  <h2>大公钥不进热路径：keyserver 负责取钥和缓存</h2>
  <p class="slide-lede">PQConnect 把“发现服务器”和“下载密钥材料”拆开：握手要快，大公钥就先通过 keyserver 获取并缓存。</p>
  <div class="keyserver-grid">
    <div class="keyserver-card longterm">
      <div class="paper-kicker">长期公钥</div>
      <strong>McEliece 公钥约 1MB</strong>
      <p>通过 Merkle tree 分成 910 个分片，客户端边下载边验证，成功后缓存复用。</p>
      <span>conservative outer layer</span>
    </div>
    <div class="keyserver-card ephemeral">
      <div class="paper-kicker">临时公钥</div>
      <strong>sntrup761 每 30 秒轮换</strong>
      <p>客户端从 keyserver 获取临时公钥，可预计算 194B KEM 密文，降低握手时延。</p>
      <span>fast-erasure inner layer</span>
    </div>
    <div class="keyserver-card path">
      <div class="paper-kicker">热路径</div>
      <strong>0-RTT 握手只消费缓存材料</strong>
      <p>首次连接要先取钥；后续连接复用缓存，第一条握手消息即可携带加密数据。</p>
      <span>key fetch before handshake</span>
    </div>
  </div>
  <div class="takeaway hybrid">PQConnect 用 keyserver 和缓存把大公钥成本移出每次握手，让保守外层和 0-RTT 目标同时成立。</div>
</div>

<!--
这里的设计很聪明。
1MB 的 McEliece 公钥不进每次握手，先通过 keyserver 和 Merkle tree 拿下来缓存。
临时 sntrup761 公钥 30 秒一换，客户端还能预计算。
热路径就轻了。
-->

---
layout: default
---

<div class="deck-slide pqc-time-slide">
  <h2>密钥擦除在 PQConnect 里变成明确的时间窗口</h2>
  <p class="slide-lede">网络包会乱序、延迟、重传；接收方不能立刻删光密钥，但也不能无限期保留。</p>
  <div class="slide-grid wide-left">
    <PaperFigure src="/papers/crops/pqc-fig2-key-ratchet.png" label="Figure 2" caption="key ratchet and two-minute erasure" source="【NDSS'25】PQConnect" />
    <div class="time-cards">
      <div class="time-card"><strong>30 秒</strong><p>发送方每个时间段使用一条新密钥链。</p></div>
      <div class="time-card"><strong>最多 120 秒</strong><p>接收方为乱序和延迟保留短窗口，然后擦除。</p></div>
      <div class="time-card"><strong>一包一钥</strong><p>每个包的加密密钥用完就尽快删除。</p></div>
    </div>
  </div>
  <div class="takeaway pq">PQConnect 用时间擦除减少“密钥一直等包”的风险，代价是时钟和乱序处理更复杂。</div>
</div>

<!--
这里回到时间。
30 秒一段，最多保留 120 秒。
就两分钟。
攻击者今天录下包，两分钟后服务器端对应的解密能力就应该被擦掉。
-->

---
layout: default
---

<div class="deck-slide pqc-packet-slide">
  <h2>应用无感的代价：每个网络包多 56 字节</h2>
  <p class="slide-lede">网络层方案不用改应用，但每个包都要带隧道身份、时间位置和认证信息。</p>
  <div class="packet-layout">
    <PaperFigure src="/papers/crops/pqc-fig3-packet-structure.png" label="Figure 3" caption="PQConnect packet structure" source="【NDSS'25】PQConnect" size="wide" />
    <div class="packet-costs">
      <div><strong>32 字节</strong><span>隧道标识</span></div>
      <div><strong>6 字节</strong><span>时间段和包位置</span></div>
      <div><strong>16 字节</strong><span>认证信息</span></div>
      <div><strong>2 字节</strong><span>消息类型</span></div>
    </div>
  </div>
  <div class="takeaway proto">网络层方案把成本集中到每个 packet 的小头部和一次可复用隧道。</div>
</div>

<!--
网络层透明是有价格的。
每个包多 56 字节。
不算巨大，但它会跟着每个 packet 走，所以这是部署成本，不是一次性成本。
-->

---
layout: default
---

<div class="deck-slide pqc-boundary-slide">
  <h2>PQConnect 证明了握手核心，部署风险还要另外接住</h2>
  <p class="slide-lede">这篇论文给网络层迁移一个强例子；它证明的对象是关键握手组件，完整部署链路还要另外分析。</p>
  <div class="lemma-boundary-grid">
    <div class="lemma-panel">
      <div class="paper-kicker">Tamarin lemmas</div>
      <div class="lemma-row">
        <strong>0_RTT_executable</strong>
        <p>无攻击干扰时，0-RTT 握手可以正常跑通。</p>
      </div>
      <div class="lemma-row">
        <strong>0_RTT_FS_confidential</strong>
        <p>长期私钥和 X25519 临时私钥泄露时，只要 sntrup761 临时私钥未泄露，历史流量密钥仍保密。</p>
      </div>
      <div class="lemma-row">
        <strong>responder_client_auth</strong>
        <p>客户端能确认自己正在和目标服务器通信。</p>
      </div>
    </div>
    <div class="boundary-panel">
      <div class="paper-kicker">模型外边界</div>
      <div class="boundary-mini dns"><strong>DNS 发现</strong><span>key hash 绑定和替换风险要在部署链路里处理。</span></div>
      <div class="boundary-mini key"><strong>keyserver / Merkle tree</strong><span>取钥、缓存、分片验证不在握手 lemma 内。</span></div>
      <div class="boundary-mini ops"><strong>DoS 与系统集成</strong><span>大公钥、多个公钥操作和主机网络栈都需要工程防护。</span></div>
    </div>
  </div>
  <div class="takeaway formal">PQConnect 证明的是关键握手组件；网络部署安全还依赖 DNS、缓存、DoS 和系统集成。</div>
</div>

<!--
PQConnect 证明的是握手核心。
0-RTT 能跑，特定泄露下历史流量密钥还保密，客户端能认证响应方。
DNS、keyserver、缓存、DoS，这些还在模型外。
这个边界要讲清楚。
-->

---
layout: default
---

<div class="deck-slide final-compare-slide">
  <h2>三篇论文的差异，首先体现在敌人怎么进模型</h2>
  <p class="slide-lede">把敌手入口、核心设计、验证工具和模型边界并排看，迁移路径的差异才会显出来。</p>
  <div class="synthesis-matrix" role="table" aria-label="三篇后量子迁移论文对比">
    <div class="matrix-head dimension">维度</div>
    <div class="matrix-head pq">PQ3</div>
    <div class="matrix-head hybrid">Hybrid-WG</div>
    <div class="matrix-head proto">PQConnect</div>
    <div class="matrix-label">敌人怎么进模型</div>
    <div class="matrix-cell"><code>PQAttackerStart</code> 事件触发</div>
    <div class="matrix-cell">MEX 泄露组合 + UKS 角色切换</div>
    <div class="matrix-cell">长期 + X25519 私钥泄露，sntrup761 保留</div>
    <div class="matrix-label">核心设计洞察</div>
    <div class="matrix-cell">KEM 贯穿双棘轮</div>
    <div class="matrix-cell">修复 → CNF 合取</div>
    <div class="matrix-cell">嵌套握手 + keyserver 缓存</div>
    <div class="matrix-label">验证工具</div>
    <div class="matrix-cell">Tamarin</div>
    <div class="matrix-cell">SAPIC+ → ProVerif + Tamarin + DeepSec</div>
    <div class="matrix-cell">Tamarin</div>
    <div class="matrix-label">最难性质</div>
    <div class="matrix-cell">injective agreement</div>
    <div class="matrix-cell">匿名性，等价性质</div>
    <div class="matrix-cell">量子前向保密，一个 lemma 覆盖四种</div>
    <div class="matrix-label">模型外边界</div>
    <div class="matrix-cell">群聊、session handling</div>
    <div class="matrix-cell">计算模型</div>
    <div class="matrix-cell">DNS、keyserver</div>
  </div>
  <div class="takeaway">选择迁移路径时，先看攻击者入口，再看要证明的状态、泄露和部署假设。</div>
</div>

<!--
现在把三篇并排看。
别再看“它们是哪一层”，前面已经讲过了。
看敌人怎么进模型：PQ3 是未来泄露事件，WireGuard 是泄露组合和角色切换，PQConnect 是长期密钥泄露下的时间擦除。
-->

---
layout: default
---

<div class="deck-slide method-choice-slide">
  <h2>做自己的迁移时，先问要相信哪条性质</h2>
  <p class="slide-lede">工具选择应该从安全问题出发：你要证明恢复、认证、匿名性，还是部署成本。</p>
  <div class="method-choice-grid">
    <div class="method-choice">
      <strong>泄露后能恢复吗？</strong>
      <p>需要建模密钥生成、删除和泄露事件。</p>
      <span>PQ3</span>
    </div>
    <div class="method-choice">
      <strong>握手有没有认错人？</strong>
      <p>需要看角色、身份绑定和最小泄露组合。</p>
      <span>Hybrid-WireGuard</span>
    </div>
    <div class="method-choice">
      <strong>观察者能分辨两种执行吗？</strong>
      <p>需要等价性质工具和交叉确认。</p>
      <span>匿名性 / 强机密性</span>
    </div>
    <div class="method-choice">
      <strong>方案能部署吗？</strong>
      <p>需要看包大小、性能、实现和系统边界。</p>
      <span>PQConnect</span>
    </div>
  </div>
  <div class="takeaway formal">形式化方法把“要相信哪条性质”变成可检查对象。</div>
</div>

<!--
做自己的迁移，先别急着选工具。
先问你要相信哪条性质。
恢复、认证、匿名性、部署成本，问的问题不同，工具也不同。
第三张卡对应 DeepSec，这里可以点一下。
-->

---
layout: default
---

<div class="deck-slide trust-boundary-slide">
  <h2>最后一定要把可信边界放到台前</h2>
  <p class="slide-lede">形式化验证给的是明确对象上的强结论；它的价值也包括清楚说出哪些东西还在模型外。</p>
  <div class="trust-grid">
    <div class="trust-card proven">
      <div class="paper-kicker">已证明</div>
      <strong>模型内的保密、认证和恢复性质</strong>
      <p>PQ3 的 32 个性质、Hybrid-WG 的 CNF 表、PQConnect 的 3 个 lemma，都属于明确模型里的可检查结论。</p>
    </div>
    <div class="trust-card open">
      <div class="paper-kicker">未覆盖</div>
      <strong>实现、侧信道、完整系统集成</strong>
      <p>群聊实现（PQ3）、计算模型（WG）、DNS 部署链路（PQC）都要在论文模型之外继续分析。</p>
    </div>
    <div class="trust-card assumptions">
      <div class="paper-kicker">依赖假设</div>
      <strong>原语安全、泄露规则和擦除行为</strong>
      <p>IDS 安全分发（PQ3）、标准 KEM 随机性（WG）、服务器时钟（PQC）决定模型结论怎样贴近系统。</p>
    </div>
  </div>
  <div class="takeaway quantum">可信边界讲清楚，听众才不会把“模型内成立”误听成“现实中无条件安全”。</div>
</div>

<!--
可信边界这页一定要讲慢一点。
已证明的很强：32 个性质、CNF 表、3 个 lemma。
但模型外也很真实：群聊、计算模型、DNS 链路。
形式化验证的价值，正是在这里把边界摊开。
-->

---
layout: default
---

<div class="closing-root">
  <div class="section-kicker">Conclusion</div>
  <h1 class="closing-title">后量子迁移的核心是协议状态重写</h1>
  <p class="closing-line">今天录下的通信，十年后是否安全，取决于迁移时协议状态机怎么改、泄露模型怎么建、工具怎么证。</p>
  <div class="mechanism-band">
    <div class="mechanism-cell"><div class="cell-title text-pq">PQ3</div><div class="cell-body">消息协议：棘轮与恢复。</div></div>
    <div class="mechanism-cell"><div class="cell-title text-hybrid">Hybrid-WG</div><div class="cell-body">VPN 握手：修复与混合。</div></div>
    <div class="mechanism-cell"><div class="cell-title text-proto">PQConnect</div><div class="cell-body">网络层：透明隧道与擦除。</div></div>
    <div class="mechanism-cell"><div class="cell-title text-formal">Verification</div><div class="cell-body">把这些状态问题变成可检查结论。</div></div>
  </div>
</div>

<!--
回到开场那句话。
今天录下的通信，十年后安不安全？
答案取决于状态机怎么改、泄露怎么建模、工具能证明到哪里。
三篇论文给了三个层次的样板。
-->

---
layout: default
---

<div class="closing-root">
  <div class="section-kicker">Q&A</div>
  <h1 class="closing-title">讨论：你会把后量子迁移放在哪一层？</h1>
  <div class="slide-grid three">
    <div class="paper-panel">
      <div class="paper-title text-pq">应用层消息</div>
      <div class="paper-meta">
        PQ3：棘轮、异步、设备状态、恢复性质。
      </div>
    </div>
    <div class="paper-panel">
      <div class="paper-title text-hybrid">VPN 握手</div>
      <div class="paper-meta">
        Hybrid-WireGuard：两消息、MTU、身份绑定、角色混淆。
      </div>
    </div>
    <div class="paper-panel">
      <div class="paper-title text-proto">网络层隧道</div>
      <div class="paper-meta">
        PQConnect：应用无感、DNS 发现、每包头部成本。
      </div>
    </div>
  </div>
  <div class="qa-tradeoff-strip">
    <span><strong>消息层</strong>：保护最细粒度，每个协议都要改状态机。</span>
    <span><strong>VPN 层</strong>：两条消息就够，MTU 和身份绑定极紧。</span>
    <span><strong>网络层</strong>：应用零改动，信任 DNS 发现入口。</span>
  </div>
  <p class="closing-line">参考资料：三篇论文原文，以及后量子密码和协议验证背景材料。</p>
</div>

<!--
最后这个问题留给讨论。
消息层细，VPN 层紧，网络层省应用改造。
看你的系统最付得起哪种代价。
-->
