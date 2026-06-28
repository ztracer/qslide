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
  <p class="slide-lede">验证：后量子密钥封装机制放到原来 Diffie-Hellman位置以后，身份和计算方法是否正确。</p>
  <div class="slide-grid wide-left">
    <div class="method-card kem-card">
      <div class="paper-kicker">Key Encapsulation Mechanism（KEM）</div>
      <div class="method-analogy">核心动作：一方用对方公钥封装出共享秘密。</div>
      <div class="operation-list">
        <div class="operation-step">
          <strong>1. 接收方先生成一对KEM密钥</strong>
          <p><code>(pk, sk) ← KeyGen()</code>：公开 <code>pk</code>，自己保存 <code>sk</code>。</p>
        </div>
        <div class="operation-step">
          <strong>2. 发送方拿接收方的 pk 做 Encaps(pk)</strong>
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
        <p><strong>WHY IT CAN'T：</strong>传统 DH/ECDH 依赖离散对数问题，未来足够强的量子计算机可用 Shor 算法破坏它。后量子密码不能继续靠这个数学假设。</p>
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
转场：先理解 iMessage/Signal 原始协议的三层密钥架构，再看 PQ3 到底把后量子材料塞进了哪个位置、定义了什么样的未来敌手。
-->

---
layout: default
---

<div class="deck-slide signal-bg-slide signal-architecture-slide">
  <h2>1.2 即时聊天软件里的端到端加密演进</h2>
  <p class="slide-lede">当 iMessage 在 2011 年推出时，是首个默认提供端到端加密的广泛可用消息应用，多年来APPLE对其加密技术进行了升级。2019 年将 iMessage 的加密协议从 RSA 升级到椭圆曲线密码 (ECC)。PQ3是苹果针对HNDL做的一次后量子迁移，并使用形式化方法进行了验证</p>
  <div class="crypto-level-map">
    <div class="level-group classical">
      <div class="group-title">
        <strong>Classical Cryptography</strong>
        <span>Not quantum secure</span>
      </div>
      <div class="level-track">
        <div class="level-node level-0">
          <div class="level-label">Level 0</div>
          <strong>No end-to-end encryption by default</strong>
          <span>QQ · Skype · Telegram · WeChat</span>
        </div>
        <div class="level-node level-1">
          <div class="level-label">Level 1</div>
          <strong>End-to-end encryption by default</strong>
          <span>Line · Viber · WhatsApp · Signal previous · iMessage previous</span>
        </div>
      </div>
    </div>
    <div class="level-group pqc">
      <div class="group-title">
        <strong>Post-Quantum Cryptography (PQC)</strong>
        <span>With end-to-end encryption by default</span>
      </div>
      <div class="level-track pq-track">
        <div class="level-node level-2">
          <div class="level-label">Level 2</div>
          <strong>PQC key establishment only</strong>
          <span>Signal with PQXDH</span>
        </div>
        <div class="level-node level-3">
          <div class="level-label">Level 3</div>
          <strong>PQC key establishment<br/>+<br/>Ongoing PQC rekeying</strong>
          <span>NEW · iMessage with PQ3</span>
        </div>
        <div class="level-node level-future">
          <div class="level-label">Future</div>
          <strong>PQC key establishment<br/>+<br/>Ongoing PQC rekeying<br/>+<br/>PQC authentication</strong>
          <span>Protection against future quantum threats</span>
        </div>
      </div>
    </div>
  </div>
  <br>
  <div class="level-callouts">
    <div><strong>Level 2 的边界</strong><span>后量子秘密只保护初始建连，长期聊天仍要靠后续状态刷新。</span></div>
    <div><strong>Level 3 的跃迁</strong><span>PQ3 周期性把 KEM 共享秘密重新塞进 root key，让 PQ 材料伴随对话向前滚动。</span></div>
    <div><strong>核心</strong><span>PQ3 将 KEM 变成长期会话状态的一部分</span></div>
  </div>
</div>

<!--
这页换成 Level 演进图，先建立听众的整体直觉：PQ3 的关键不是把后量子握手放在开头做一次，而是在长期对话中持续做 PQC rekeying。

Level 0：默认没有端到端加密。
Level 1：默认端到端加密，但主要还是经典密码学。
Level 2：建连阶段有后量子密钥建立，比如 Signal with PQXDH。它挡住 HNDL 的第一轮风险，但后续长期对话如果只依赖旧状态，就没有持续后量子刷新。
Level 3：PQ3 的重点是 PQC key establishment + ongoing PQC rekeying。也就是后量子 KEM 材料会周期性进入会话状态，刷新 root key，再影响 chain key 和 message key。
Future：进一步还需要 PQC authentication，避免身份认证仍依赖经典签名。

这张图的讲法：
不要先陷入 IDS、IK/SPK/OPK、RK/CK/MK 的细节。先让听众看到“Level 2 到 Level 3”的差别：一次性 PQ 握手 vs 长期持续重注入。

下面这些是需要口头补的技术背景：

三层密钥：根密钥（RK）保存对话积累的秘密，由 DH 棘轮更新；链密钥（CK）服务一个发言方向，由对称棘轮推进；消息密钥（MK）加密单条消息，用完删除。

IDS 是关键信任锚点：发起方从 IDS 拉到接收方的公钥包，如果 IDS 被控制则认证性不成立。PQ3 论文把"IDS 诚实分发公钥"作为显式假设写进了模型。

初始密钥协商：Alice 从 IDS 拉 Bob 的 identity key + signed pre-key + one-time pre-key，生成临时 ECDH 密钥，分别与 Bob 的多把公钥做多次 DH，结果送进 KDF 得到初始 root key。这个流程和 Signal 的 X3DH 设计理念类似，但 iMessage 有自己的具体实现。

双棘轮：DH 棘轮在方向切换时更新 root key（注入新熵 → PCS），对称棘轮在连续发送时推进 chain key（每条消息一个 MK → FS）。

为什么这页重要：后面 PQ3 的改动全部围绕"在这条经典依赖链的哪个位置放入 KEM 共享秘密"展开。

转场：有了 Level 3 的目标以后，再看 PQ3 定义了什么样的未来敌手。
-->

---
layout: default
---

<div class="deck-slide pq-attack-slide">
  <h2>1.3 PQ3 敌手：PQAttackerStart 未来泄露事件</h2>
  <p class="slide-lede">面对 HNDL，论文把未来量子能力抽象成一个事件😀：假设【经典公钥】相关的秘密全部暴露。</p>
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
这页先定义 PQ3 要防的未来敌手：PQAttackerStart 不是一种新敌手，而是模型中的阶段切换：从这一刻起，经典 ECDH 相关秘密可被视为已泄露，用来模拟未来量子攻击。

Dolev-Yao attacker 是 Tamarin 这类符号模型默认的网络敌手能力：可以监听、拦截、重放、组合、拆解已知消息，但不能凭空破解密码原语。

PQAttackerStart 是 PQ3 为了模拟 “Harvest Now, Decrypt Later” 额外加入的时间点：从这个事件之后，攻击者被允许拿到经典公钥密码相关的秘密，比如 ECDH 私钥等。它表达的是：`未来量子计算机出现后，经典 ECC/DH 相关秘密不再可信。`

转场：面对这个敌手，PQ3 的核心答案是让 KEM 材料进入 root key、chain key 和 message key 的依赖链。

PQAttackerStart模拟的就是"未来量子计算机把椭圆曲线全破了，但格密码还没破"这个时刻。
-->

---
layout: default
---

<div class="deck-slide pq3-keys-slide">
  <h2>1.4 PQ3 的方案：让 KEM 进入消息密钥的来源链</h2>
  <div class="slide-grid wide-right">
    <div class="key-layers">
      <div class="key-layer root">
        <div class="key-layer-name">会话根密钥 <span>root key</span></div>
        <p>整个会话秘密的“蓄水池”，保存着对话长期积累的安全性。当补充新的公钥材料时，旧的会话根状态会与新的 ECDH 和 KEM 秘密一起输入，衍生出下一版的会话根。</p>
      </div>
      <div class="key-layer chain">
        <div class="key-layer-name">消息链密钥 <span>chain key</span></div>
        <p>负责服务单向的发信方向。当Alice连续发送消息时，这条链会采用对称密码学的棘轮机制，每发一条消息就向前迈进一步（派生出新的ck）。</p>
      </div>
      <div class="key-layer message">
        <div class="key-layer-name">单条消息密钥<span>message key</span></div>
        <p>真正用来加密/解密当前那条具体消息的密钥。本着"用完即删"的原则，一旦消息加解密完成立刻销毁。这样即使该密钥泄露，攻击者也只能解密这一条消息，缩小了泄露能牵连的范围。</p>
      </div>
      <div class="start-mini-flow">
        <strong>会话启动三步</strong>
        <span>查到 Bob 的 ECDH / KEM 预密钥</span>
        <span>算出经典秘密和后量子秘密</span>
        <span>一起派生第一版 root key 和 chain key</span>
      </div>
    </div>
    <PaperFigure src="/papers/crops/pq3-fig1-key-dependency.png" label="Figure 1" caption="PQ3 key dependency" source="【USENIX Security'25】PQ3" />
  </div>
</div>

<!--

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

转场：Figure 1 画的是密钥之间的静态依赖关系；接下来把这张图放进一次完整的 Alice→Bob 会话里走一遍，看三个棘轮分别在什么时候动作。

右侧的图表直观地展示了这些密钥是如何融合并向下派生的。我们可以将其看作一个漏斗形的派生树：
1. 输入阶段（最上方）整个派生过程有两大混合输入源，实现了混合加密（Hybrid）：
- ECDH 侧： 经典的椭圆曲线DH交换。结合了对方的公钥（From peer Pub）和自己的私钥（From client Priv），通过 DH 计算生成经典秘密。
- KEM 侧：后量子密钥封装机制。同样结合了对方的公钥和自己的私钥，通过解封装或封装，生成后量子共享秘密（KEM SS）。
2. 混合与注入阶段（中间横线）所有的输入被汇总到一条水平线上，并设置了容错与迭代机制：
- 经典侧： 包含了上一代的会话根 。如果是首次启动，则没有上一代（对应左边的 0x0）。
- 后量子侧： 图中带有锁图标和 OR 的逻辑意味着，即使在某些初始阶段或特殊握手中没有 KEM 秘密（对应右边的 0x0），系统也能平滑退化或正常运行。最终，旧的会话根（$rk_i$ 或 0x0） + 经典 DH 秘密 + 后量子 KEM SS 全部作为输入，一起注入到 HKDF（基于哈希的密钥派生函数）中。
3. 产出与棘轮阶段（最下方）通过 HKDF 的打碎与派生，产出了两个核心成果：$rk_{i+1}$：下一代的会话根，留在上层等待下一次密钥交换时迭代。$ck_{i,0}$：第 $i$ 代的第 0 步消息链密钥。从 $ck_{i,0}$ 开始，它像棘轮一样向下滚动：一方面派生出 $mk_{i,0}$（用于加密第 0 条消息）。另一方面推进一步派生出 $ck_{i,1}$（用于准备下一条消息的消息链密钥）。

核心含金量在于展示了 “经典安全 + 后量子安全” 的双保险设计。PQ3 协议并没有抛弃传统的 ECDH，而是通过 HKDF 将经典 DH 秘密与后量子 KEM 秘密完美熔炼在一起，并顺着“会话根 $\rightarrow$ 消息链 $\rightarrow$ 单条消息”的层级向下传递，从而让每一条 iMessage 消息都具备了防御未来量子计算机攻击的能力。
-->

---
layout: default
hide: true
---

<div class="deck-slide pq3-flow-slide">
  <h2>1.5 PQ3 消息流走读：从首发到回复，三个棘轮各司其职</h2>
  <p class="slide-lede">把刚才 Figure 1 的依赖关系和 Figure 2 的公钥棘轮放到一次完整会话里走一遍。</p>
  <div class="pq3-msg-flow">
    <div class="flow-phase init">
      <div class="phase-header">
        <div class="phase-num">Phase ①</div>
        <strong>Alice 首发：拉包 → 混合协商 → 初始化会话</strong>
      </div>
      <div class="phase-steps">
        <div class="flow-step"><span>1</span><p>从 IDS 拉取 Bob 的 P-256 ECDH 公钥 <strong>和</strong> Kyber-1024 KEM 公钥。</p></div>
        <div class="flow-step"><span>2</span><p>ECDH：Alice 临时私钥 × Bob 的 P-256 公钥 → <strong>经典共享秘密</strong>。</p></div>
        <div class="flow-step"><span>3</span><p>KEM：用 Bob 的 Kyber 公钥封装 → <strong>后量子共享秘密</strong> + 密文 ct。</p></div>
        <div class="flow-step"><span>4</span><p>HKDF-SHA384 先后 Extract 两份秘密 → 合并派生 <strong>初始 root key</strong>。</p></div>
        <div class="flow-step"><span>5</span><p>从 root key 派生第一条发送链密钥（CK<sub>send</sub>）→ 对称棘轮产生 message key → 加密首条消息。</p></div>
      </div>
    </div>
    <div class="flow-arrow-between">▼  Alice 连续发多条消息：对称棘轮逐条推进 chain key，每条消息一把新 MK，用完删除 ▼</div>
    <div class="flow-phase reply">
      <div class="phase-header">
        <div class="phase-num">Phase ②</div>
        <strong>Bob 回复：DH 棘轮 + 周期性 KEM 重注入</strong>
      </div>
      <div class="phase-steps">
        <div class="flow-step"><span>6</span><p>Bob 生成新鲜 ECDH 棘轮密钥对，用 Alice 的上次棘轮公钥做 DH → 新共享秘密。</p></div>
        <div class="flow-step"><span>7</span><p>旧 root key + 新 DH 秘密 → HKDF → <strong>更新 root key</strong>。（这是经典 DH 棘轮，每条回复都发生）</p></div>
        <div class="flow-step"><span>8</span><p>如果满足触发条件（约每 50 条消息 / 至少每 7 天一次）：Bob 额外发送新鲜 Kyber-768 KEM 公钥，Alice 封装 → <strong>新的后量子共享秘密</strong> 也进入 root key 更新。</p></div>
        <div class="flow-step"><span>9</span><p>新 root key 派生 Bob 的发送链密钥 → 对称棘轮 → Bob 的每条回复消息一把新 MK。</p></div>
      </div>
    </div>
  </div>
  <div class="three-ratchet-summary">
    <div class="ratchet-mini sym"><strong>对称棘轮</strong><span>每条消息推进 chain key → 消息密钥用完即删 → 前向保密</span></div>
    <div class="ratchet-mini dh"><strong>ECDH 棘轮</strong><span>每次回复注入新 DH 熵 → 经典泄露后恢复（每条消息触发）</span></div>
    <div class="ratchet-mini kem"><strong>Kyber KEM 棘轮</strong><span>周期性注入后量子熵 → 后量子泄露后恢复（自适应触发，约 50 条 / 7 天）</span></div>
  </div>
  <div class="takeaway pq">PQ3 = 经典双棘轮 + 第三个周期性后量子棘轮。核心创意：KEM 材料不只在会话开始时进入一次，而是在整个对话生命周期中反复刷新。</div>
</div>

<!--
这页是整段 PQ3 讲解中最重要的"故事线"——把 Figure 1（密钥依赖图）和 Figure 2（公钥棘轮步骤）串成一次完整的消息流。

Phase ① Alice 首发：
1. 从 IDS 拉 Bob 的两种公钥：P-256（经典）和 Kyber-1024（后量子）
2. ECDH 得经典共享秘密
3. KEM Encaps 得后量子共享秘密 + 密文
4. 两份秘密先后送进 HKDF-SHA384 → 合并派生初始 root key
5. root key → chain key → symmetric ratchet → message key → 加密

Phase ② Bob 回复：
6. Bob 生成新鲜 ECDH 棘轮密钥，与 Alice 的上次公钥做 DH（经典 DH 棘轮）
7. 旧 root key + 新 DH 秘密 → 更新 root key
8. 关键区别：这里还会周期性触发 Kyber KEM 重注入。大约每 50 条消息或至少每 7 天一次，Bob 发送新鲜 Kyber-768 公钥，Alice 封装 → 新的后量子秘密进入 root key 更新
9. 新 root key → Bob 的 chain key → symmetric ratchet → Bob 的消息

三个棘轮的对比总结：
- 对称棘轮：每条消息，推进 chain key，用完删除 → FS
- ECDH 棘轮：每次回复，注入新 DH 熵 → 经典 PCS
- Kyber KEM 棘轮：周期性（~50 msgs / 7 days），注入后量子熵 → 后量子 PCS

这页也解释了 Apple 为什么宣称 PQ3 达到 "Level 3"：Level 2（如 Signal PQXDH）只在初始握手做一次后量子密钥协商；PQ3 在整个对话生命周期中周期性重注入后量子材料，所以即使中间某次 root key 泄露，后续 KEM 刷新能恢复安全。

转场：KEM 周期性重注入引出一个自然问题——刷新到底发生在什么时间点？攻击者又在哪个时间点拿到哪些秘密？这就是下一页要讲的泄露窗口。
-->

---
layout: default
---

<div class="deck-slide pq3-refresh-slide">
  <h2>1.5 周期性刷新：经典棘轮频繁刷，KEM 棘轮周期刷</h2>
  <p class="slide-lede">如果只在初始握手中引入 KEM，后续哪怕聊了成千上万条消息，它们都依然依赖同一个根密钥（root key）里的旧 KEM 材料。一旦这个初始材料在未来被泄露+破解，长期的对话依然不安全，PR3的做法是每当发言方向切换，双方就会用新的公钥材料刷新上层状态，确保后续消息能持续获得全新的 KEM 材料保护。</p>
  <div class="slide-grid wide-left">
    <PaperFigure src="/papers/crops/pq3-fig2-public-key-ratchet.png" label="Figure 2" caption="四个 public-key ratchet step" source="【USENIX Security'25】PQ3" />
    <div class="refresh-explain">
      <div class="paper-kicker">阅读线索</div>
      <div class="refresh-point">
        <strong>步骤 ①：会话开始</strong>
        <p>Alice 用 Bob 登记过的预密钥建立第一版会话根。</p>
      </div>
      <div class="refresh-point">
        <strong>步骤 ② 和 ③：有人开始回复</strong>
        <p>发言方向切换时，双方用新的公钥材料派生下一版会话根。【KEM 的位置变成了 0x0 ，主要使用经典棘轮，以保持极高的运行效率。】</p>
      </div>
      <div class="refresh-point">
        <strong>步骤 ④：KEM 周期性重新注入</strong>
        <p>为了防御 HNDL，新的 KEM 公钥和封装结果会周期性进入后续公钥棘轮。【锁头图标和 SS（共享秘密）再次出现 —— 会话根又得到了后量子级别重置】</p>
      </div>
    </div>
  </div>
  <div class="takeaway pq">PQ3 的后量子保护伴随对话继续刷新，后续消息会持续获得新的 KEM 材料。也就是通过步骤 ④ 保证前向安全性和后向安全性。</div>
</div>

<!--

这里先回答”为什么需要周期性刷新”：如果只有第一轮混合（Level 2，比如 Signal PQXDH），后续几千条消息都依赖同一个 root key 里的旧 KEM 材料 → 后量子保护不会向前滚动。PQ3 的 Level 3 就是通过周期性 KEM 重注入解决这个问题。

图里左边是 Alice，右边是 Bob。每一层是会话状态往前刷新一次。当发言方向切换时，比如 Alice 发完一段，Bob 开始回复，双方会拿新的公钥材料重新派生 root key。这里既有 ECDH 的材料，也有 KEM 的材料。

因为长期协议里，安全不是一个静态结论。
密钥会不断更新，攻击者也可能在不同时间点拿到不同秘密。
情况 1：攻击者在刷新前拿到旧状态。
- 那它可能追到刷新前的一段消息。

情况 2：新的 KEM 材料已经进 root key 以后，攻击者才拿到旧经典秘密。
- 那旧经典秘密就不一定能推出后面的消息密钥，因为后面的 root key 已经混入了新的 KEM secret。
情况 3：攻击者未来拿到所有 ECDH 相关经典秘密。
- 这正是 HNDL / PQAttack 的设定。PQ3 要证明的是，只要 KEM secret 没被拿到，新的后量子材料能把后续状态重新撑起来。

刷新发生在不同时间点，而泄露也发生在某个时间点。安全边界取决于”泄露发生在刷新之前还是之后”。

这页是在为下一页铺垫：PQ3 的安全性不是只关联 KEM，而是思考 KEM 什么时候进入 root key，攻击者又是在什么时候拿到哪些秘密。
-->

---
layout: default
---

<div class="deck-slide pq3-windows-slide">
  <h2>1.6 泄露会发生在哪？影响是什么？</h2>
  <p class="slide-lede">刷新窗口的意义在这里：同样是密钥泄露，发生在新公钥材料进入之前或之后，会给出完全不同的安全边界。下面用一个具体场景走一遍三种时间关系。</p>
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
  <div class="window-concrete">
    <div class="paper-kicker">具体走一遍</div>
    <div class="concrete-scenario">
      <div class="scenario-setup"><strong>场景</strong><span>Alice 和 Bob 已经聊了 30 条消息；第 31 条是 Bob 的回复，触发 DH 棘轮 + 周期性 Kyber KEM 重注入。</span></div>
      <div class="scenario-cases">
        <div class="case bad"><strong>情况 A · 刷新前泄露</strong><span>第 25 条拿到 ECDH 棘轮私钥 → 可能回溯第 25-30 条；第 31 条后由新 KEM 材料切断追溯链。</span></div>
        <div class="case ok"><strong>情况 B · 刷新后泄露</strong><span>第 35 条才拿到旧 ECDH 私钥 → 新 root key 已混入 KEM 秘密，旧经典秘密不足以推出后续消息。</span></div>
        <div class="case worst"><strong>最坏情况 · 刷新夹缝</strong><span>第 30-31 条之间同时拿到旧 root key 和 ECDH 私钥 → 刷新前状态失败，但后续仍可重新恢复。</span></div>
      </div>
      <div class="scenario-moral"><strong>结论</strong><span>安全边界取决于：攻击者拿到哪些秘密，以及泄露发生在刷新之前还是之后。</span></div>
    </div>
  </div>
  <div class="takeaway">机制到此变成验证问题：攻击者在哪一刻拿到哪些秘密，直接决定保密程度和恢复条件。</div>
</div>

<!--
这一页从机制进入验证。上面的三个时间窗口给出了三种理论边界，下面用 Alice 和 Bob 聊了 30 条消息、第 31 条触发 KEM 重注入的具体场景走一遍。

情况 A（刷新前泄露）：攻击者在第 25 条拿到 ECDH 私钥 → 能回溯同一 DH 棘轮周期内的第 25–30 条，但第 31 条以后新 KEM 材料已进入 root key → 切断追溯。
情况 B（刷新后泄露）：攻击者在第 35 条才拿到旧 ECDH 私钥 → 第 31 条之后的 root key 已混入新 KEM 秘密 → 旧经典秘密不够。
最坏情况：攻击者在第 30-31 条之间同时拿到旧 root key + ECDH 私钥 → 刷新前状态被攻破，但第 32 条起仍有新后量子材料保护。

这里的 lemma 可以先理解成验证工具要证明的一条安全断言：如果没有发生指定的泄露例外，攻击者就不应该知道消息。这页就是在解释这些例外从哪里来。同样是泄露，发生在刷新前、刷新时、刷新后，影响范围完全不一样。PQ3 的保密证明不是简单说’泄露了也安全’，而是精确写清楚：哪一刻泄露了哪些秘密，哪些消息还应该保密，哪些消息只能列为例外。

最后一句话点题：消息保密、前向保密、泄露后恢复，对同一个 secrecy lemma 来说，只是泄露条件不同。
-->

---
layout: default
---

<div class="deck-slide pq3-model-slide">
  <h2>1.7 PQ3 的形式化验证：全场景安全状态机模型</h2>
  <p class="slide-lede">将协议会话、密钥滚动、动态泄露及未来量子攻击(HNDL)统一抽象为单一形式化状态机模型。利用 Tamarin 验证工具证明协议无安全漏洞路径。</p>
  <div class="slide-grid wide-left">
    <PaperFigure src="/papers/crops/pq3-fig3-model-overview.png" label="Figure 3" caption="formal model overview" source="【USENIX Security'25】PQ3" />
    <div class="model-reading">
      <div class="paper-kicker">读图顺序</div>
      <div class="model-reading-card">
        <strong>1. 核心会话状态</strong>
        <p>形式化定义通信双端的当前密钥资产、单向链计数器及状态机方向。</p>
      </div>
      <div class="model-reading-card">
        <strong>2. 协议转换规则</strong>
        <p>将消息收发、棘轮动态更新及废弃密钥销毁等行为抽象为可执行的状态转换</p>
      </div>
      <div class="model-reading-card">
        <strong>3. 混合敌手与泄露模型</strong>
        <p>将瞬时密钥泄露与未来后量子威胁（PQAttacker）共置于同一状态空间，验证极端条件下的协议韧性。</p>
      </div>
    </div>
  </div>
  <div class="takeaway formal">利用 Tamarin 证明了 PQ3 在复杂交错的“通信-刷新-泄露”并发场景下的前向与后向安全性</div>
</div>

<!--


介绍完 PQ3 协议的密钥滚动设计后，我们不可避免地会面临一个学术追问：这个协议在理论上真的绝对安全吗？复杂的动态刷新会不会引入逻辑漏洞？

为了证明这一点，论文采用了形式化验证工具 Tamarin，将 PQ3 的全生命周期放进了同一个状态机模型中进行自动化搜索（对应图中的 Figure 3）。我们可以从三个维度来理解这个验证模型：

    首先看中间，是‘会话状态（Session）’： 模型定义了发送端和接收端各自保存的当前密钥、计数器和消息方向等基础状态，作为整个有限状态机的核心纽带。

    其次看两侧，是‘允许的动态行为’： 诸如发消息、收消息、公钥/对称密钥棘轮刷新、删除旧材料等正常操作，都被抽象成了状态机中可执行的转换规则（Rules）。

    最后看下方，是‘未来的泄露与攻击事件’： 这是本篇论文模型的核心亮点。它把‘经典秘密被当下黑客窃取’、‘未来量子计算机发动攻击（PQAttacker）’等敌手行为，与正常聊天融合在同一个状态空间里。

总结来说： 验证工具通过在这三个维度的无数种任意交错组合中进行暴力搜索，最终证明了：无论攻击者在哪个时间点切入、泄露何种密钥，PQ3 都能保证安全，没有产生任何可被利用的‘坏路径’。这为 PQ3 提供了强有力的数学证明。

-->

---
layout: default
hide: true
---

<div class="deck-slide pq3-secrecy-slide">
  <h2>1.8 一个保密性 lemma 同时表达三种安全边界</h2>
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
hide: true
---

<div class="deck-slide pq3-agreement-slide">
  <h2>1.9 认证性：我收到的消息真是你发的吗？</h2>
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

转场：保密和认证都看完后，还有一个方法层面的贡献：PQ3 展示了 Tamarin 也能处理双棘轮这种嵌套循环协议。
-->

---
layout: default
hide: true
---

<div class="deck-slide pq3-proof-slide">
  <h2>1.10 Tamarin 也能处理嵌套循环协议</h2>
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
  <h2>1.8 总结：PQ3 的安全边界与形式化方法学贡献</h2>
  <p class="slide-lede">本项工作核心贡献主要体现在两个维度：不仅完整确立了 PQ3 在符号模型下的机密性与认证边界，更在方法学上拓展了 Tamarin 处理复杂嵌套循环协议的能力。</p>
  <div class="wrap-grid">
    <div class="wrap-card effort">
      <div class="paper-kicker">验证规模</div>
      <strong>32 属性与辅助引理</strong>
      <p>强认证性（Strong Authentication）验证耗时约 7 小时，开销为 20GB 内存；部分机密性与动态泄露属性的验证极具挑战，峰值内存开销达 100GB。</p>
    </div>
    <div class="wrap-card covered">
      <div class="paper-kicker">验证边界</div>
      <strong>端到端消息协议安全目标</strong>
      <p>全面覆盖符号模型下的机密性、认证性、前向安全性（FS）以及后向安全性（PCS / 泄露后恢复）。</p>
    </div>
    <div class="wrap-card boundary">
      <div class="paper-kicker">方法学推进</div>
      <strong>复杂嵌套循环协议的可证明性</strong>
      <p>通过引入状态事实归纳式辅助引理，成功在 Tamarin 中对真实端到端协议的复杂嵌套循环结构进行了精确建模与形式化推导。</p>
    </div>
  </div>
</div>

<!--
PQ3 case 用这一页收束：它同时给出证明成本和适用边界。

转场：接下来换一个完全不同的场景，VPN 握手很短，但 KEM 替换 DH 的语义问题更尖锐。

-->

---
layout: default
---

<div class="section-slide wireguard-section-slide">
  <div class="section-kicker">Case B · Hybrid-WireGuard【USENIX Security'25】</div>
  <h1 class="section-title">Hybrid-WireGuard: 两条握手消息下的后量子身份绑定重构</h1>
  <div class="section-points">
    <div class="section-point-card problem">
      <span>问题入口</span>
      <p>原生 WireGuard 只用两轮 DH 同时完成密钥协商、静态身份绑定与前向保密；直接换成 KEM 会让身份绑定失效。</p>
    </div>
    <div class="section-point-card repair">
      <span>核心工作</span>
      <p>先修复既有 PQ-WireGuard 漏洞，得到 PQ-WireGuard⋆，再把经典侧和后量子侧重构成 Hybrid Handshake。</p>
    </div>
    <div class="section-point-card robust">
      <span>鲁棒性</span>
      <p>敌手必须同时攻破经典密码体制和后量子体制，才能瓦解混合方案。</p>
    </div>
  </div>
</div>

<!--

接下来，我们来看第二个学术案例：Hybrid-WireGuard（发表于 USENIX Security '25）。这篇工作聚焦于如何将后量子密码学引入经典的 VPN 协议 WireGuard。

首先，我们需要了解原版 WireGuard 的一个极简设计特性：它仅通过两条握手消息，利用 DH（迪菲-赫尔曼）算法同时完成了‘密钥协商’、‘身份绑定’和‘前向保密’。这种高度复合的设计非常优雅，但也给后量子改造带来了极大的挑战。

此前有研究提出了 PQ-WireGuard，但由于后量子 KEM 无法像传统 DH 那样直接提供‘隐式身份认证’，导致其方案存在安全漏洞。

本文的核心贡献正是为了解决这个问题：

- 论文首先修复了前人方案的漏洞，得到了一个修正版的方案，称为 PQ-WireGuard*。
- 随后，在此基础上重构了经典与后量子的‘混合握手协议’，成功在短短两条握手消息的限制内，重新建立了严密的身份绑定。

论文最终给出了一个强有力的核心结论：该混合方案具备完美的双重保险特性。攻击者必须同时攻破经典侧（如经典椭圆曲线）和后量子侧（如后量子 KEM），才能够破坏该方案的安全性质。只要有一侧安全，整个网络连接就是安全的。这为 WireGuard 向后量子时代的平滑过渡提供了坚实的理论支撑。

-->

---
layout: default
---

<div class="deck-slide wg-dh-slide">
  <h2>2.1 原生 WireGuard 密码学设计：DH 的三重安全属性复合</h2>
  <p class="slide-lede">原生协议中 DH 机制高度复合了密钥协商、身份认证与状态绑定，导致后量子 KEM 的对等替代面临属性错配。</p>
  <div class="wg-dh-layout">
    <div class="wg-flow-diagram">
      <div class="flow-peer initiator">Initiator</div>
      <div class="flow-peer responder">Responder</div>
      <div class="wg-message m1">
        <strong>Message 1</strong>
        <div class="message-path">
          <span class="endpoint left">Initiator</span>
          <span class="wire"></span>
          <span class="endpoint right">Responder</span>
        </div>
      </div>
      <div class="wg-message m2">
        <strong>Message 2</strong>
        <div class="message-path">
          <span class="endpoint left">Initiator</span>
          <span class="wire"></span>
          <span class="endpoint right">Responder</span>
        </div>
      </div>
      <div class="wg-compute identity">
        <code>DH(E<sub>i</sub>, S<sub>r</sub>) / DH(S<sub>i</sub>, E<sub>r</sub>)</code>
        <span>→ 【责任1：静态身份绑定】</span>
      </div>
      <div class="wg-compute pfs">
        <code>DH(E<sub>i</sub>, E<sub>r</sub>)</code>
        <span>→ 【责任2：临时前向保密】</span>
      </div>
      <div class="wg-compute context">
        <code>Chaining Key ← Hash(...)</code>
        <span>→ 【责任3：上下文哈希锁定】</span>
      </div>
    </div>
    <div class="wg-dh-grid">
      <div class="wg-dh-card identity">
        <div class="paper-kicker">Authentication</div>
        <strong>1. 隐式身份认证 (Authentication)</strong>
        <p>利用静态 DH 长期密钥对完成计算，将共享秘密直接与对端静态身份（Static ID）强绑定，免除签名开销。</p>
      </div>
      <div class="wg-dh-card secrecy">
        <div class="paper-kicker">PFS</div>
        <strong>2. 完美前向安全性 (PFS)</strong>
        <p>引入每轮更迭的临时 DH（Ephemeral DH）材料，切断历史会话与长期密钥的关联，确保前向安全。</p>
      </div>
      <div class="wg-dh-card transcript">
        <div class="paper-kicker">Context Binding</div>
        <strong>3. 协议上下文绑定 (Context Binding)</strong>
        <p>将握手期间的所有公钥、密文及传输方向单向滚入哈希链（Chaining Key），阻断会话劫持与重放攻击。</p>
      </div>
    </div>
  </div>
  <div class="wg-constraint"><strong>⚠️ 工程硬性约束 (Hard Constraints)：</strong> 严格限定于 <strong>2 帧 UDP 握手报文</strong>，且须适配 IPv6 最小 <strong>MTU (1280 字节)</strong> 严禁 IP 分片。这对后量子 KEM 的<strong>公钥与密文尺寸（Size Overhead）</strong>提出了极苛刻的吞吐量限制。</div>
</div>

<!--
要理解这篇论文的贡献，我们必须先拆解原生 WireGuard 协议的设计精髓，以及它给后量子 KEM 迁移带来的根本性阻碍。

原生 WireGuard 之所以高效，是因为它的 DH（迪菲-赫尔曼）操作在握手中同时承担了三个核心责任：

    第一，是‘身份认证’（Identity）： 协议使用静态公钥（Static DH）。静态 DH 的计算直接把共享秘密与对端的长期 Peer 身份绑定在了一起，实现了‘隐式认证’，不需要额外的数字签名。

    第二，是‘及时性与前向保密’（PFS）： 协议每次握手都会生成临时公钥（Ephemeral DH）。通过引入这种动态的新材料，确保了即使未来的长期密钥泄露，历史流量也无法被解密。

    第三，是‘上下文锁定’（Context Binding）： 握手过程中的公钥、加密的密文甚至是消息方向，都会被持续输入并滚入一个哈希链。这锁定了对话上下文，彻底杜绝了重放攻击或将材料挪移到其他会话的可能。

这就是矛盾所在： 传统的 DH 既能做密钥协商，又能做身份绑定。但后量子时代的 KEM（密钥封装机制）是一门单向的生意——它只能用来加密传输一个秘密，天然无法提供隐式身份认证。

此外，工程上还有一个硬性死穴（对应下方橙色框）：WireGuard 严格限制在两条 UDP 握手消息内，且必须适配 IPv6 最小 MTU 的 1280 字节，严禁分片（Fragmentation）。这意味着我们无法像其他协议那样，肆无忌惮地把动辄几千字节的后量子大公钥塞进协议。

这种‘数学特性不匹配’与‘工程物理限制’的碰撞，就是 Hybrid-WireGuard 必须解决的核心挑战。
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
  <h2>2.3 WireGuard 后量子混合协议演化路线</h2>
  <p class="slide-lede">分析原协议问题 -> 分析第一次迁移出现的问题 -> 给出 PQ-WireGuard⋆ 以及构造混合方案。</p>
  <div class="evolution-rail">
    <div class="evolution-step base">
      <div class="paper-kicker">Native WireGuard</div>
      <strong>基于经典 DH 的紧耦合握手</strong>
      <p>协议的核心安全属性（身份、时效性、密钥派生）高度内聚于经典 DH 体制</p>
    </div>
    <div class="rail-arrow">→</div>
    <div class="evolution-step pqwg">
      <div class="paper-kicker">PQ-WireGuard</div>
      <strong>后量子 KEM 的初步迁移尝试</strong>
      <p>引入抗量子机制，但未能适配其数学特性，导致协议角色权限混淆、封装语义缺失及匿名性泄露漏洞。</p>
    </div>
    <div class="rail-arrow">→</div>
    <div class="evolution-step fix">
      <div class="paper-kicker">PQ-WireGuard⋆</div>
      <strong>协议语义修正与安全修复</strong>
      <p>重构重封装机制，将 KEM 共享秘密、长期静态身份及握手上下文进行强解耦与再绑定，修复已知漏洞。</p>
    </div>
    <div class="rail-arrow">→</div>
    <div class="evolution-step hybrid">
      <div class="paper-kicker">Hybrid-WireGuard</div>
      <strong>双侧安全混合握手协议</strong>
      <p>构建经典-后量子并行绑定体系，提供双重保障机制，兼顾传统合规密码学兜底与抗量子计算攻击。</p>
    </div>
  </div>
  <div class="takeaway formal">后续方案分析主线：协议报文中增量引入了何种后量子/经典密钥材料？上述增量材料以何种拓扑结构融入 HKDF 密钥派生链？</div>
</div>

<!--
为了在不破坏 WireGuard 极简工程限制的前提下解决上述错配问题，本篇论文梳理出了一条清晰的 WireGuard 后量子演化路线（对应图中四个阶段）。

第一阶段是原生的 WireGuard： 正如前面所讲，它是一个由 DH 主导的握手，身份认证、新鲜性和密钥派生全都强依赖于经典 DH 材料。

第二阶段是学术界此前的首次尝试，即 PQ-WireGuard： 前人尝试首次把 KEM 引入握手。然而，由于 KEM 的单向机制与传统 DH 存在本质不同，简单的对等替代直接暴露出了协议在角色权限划分、封装语义以及用户匿名性上的严重安全缺陷。

第三阶段是本文的第一个核心贡献，即 $PQ\text{-}WireGuard^\star$： 论文通过对前人方案进行修正与重新封装，将 KEM 秘密、静态身份和握手上下文进行更严密的交叉重新绑定，成功修复了上述安全性与匿名性漏洞。

第四阶段则是终极形态，Hybrid-WireGuard： 在纯后量子修复的基础上，论文引入了经典与后量子一起绑定的混合方案。它实现了‘双保险’：保留经典的 DH 作为算力兜底，同时融合 KEM 抵抗未来量子的冲击。

提示大家一下（对应下方 Key-point）： 明确了这条演化路线后，在接下来拆解具体方案表时，我们只需要紧扣两个核心主线：第一，消息里究竟新增了什么材料？第二，这些新材料是如何进入密钥派生链的？ 抓住了这两点，整个协议的重构逻辑就会非常清晰。

-->

---
layout: default
---

<div class="deck-slide wg-fix-slide">
  <h2>2.4 PQ-WireGuard⋆：既有缺陷诊断与三处密码学语义修复</h2>
  <p class="slide-lede">针对既有方案在安全属性重构上的失效，从认证、语义及隐私三个维度实施精确修复。</p>
  <div class="fix-grid">
    <div class="fix-card role">
      <div class="paper-kicker">UKS 修复</div>
      <strong>1. 抵抗未知密钥共享攻击 (UKS Anti-compromise)</strong>
      <p>将双端静态公钥哈希强制引入 KDF 显式上下文，消除由于 KEM 缺乏隐式认证而导致的身份认知失配。</p>
      <span>HASH(S_i, S_r) → KDF context</span>
    </div>
    <div class="fix-card kem">
      <div class="paper-kicker">KEM 修复</div>
      <strong>2. 规范化 KEM 安全语义</strong>
      <p>废除规避传统 DH 局限而盲目引入的“确定性封装”，恢复标准 KEM 的随机化封装机制，契合 IND-CCA2 安全模型。</p>
      <span>deterministic Encaps → randomized KEM</span>
    </div>
    <div class="fix-card anon">
      <div class="paper-kicker">匿名性修复</div>
      <strong>3. 握手期身份匿名性保护</strong>
      <p>对首帧握手报文中的 KEM 密文 ct₁ 实施加密混淆，阻断网络窃听者的指纹识别与流量分析。</p>
      <span>ct₁ protected in InitHello</span>
    </div>
  </div>
  <div class="fix-summary">修正后的 PQ-WireGuard⋆ 同时覆盖 UKS 抵抗、标准 KEM 语义、匿名性、前向保密和会话密钥保密。</div>
  <div class="takeaway">Unknown Key-Share：未知密钥共享攻击。意思是双方算出了同一把会话密钥，但对"这把 key 是和谁共享的"理解不一致。</div>
</div>

<!--
这页讲 PQ-WireGuard⋆ 的三处修复，把它和早期 PQ-WireGuard 区分开。

明确了演化路线后，我们切入本文的第一个核心成果：$PQ\text{-}WireGuard^\star$。

论文指出，此前的 PQ-WireGuard 方案在安全验证中暴露了三处严重的语义漏洞，本文通过针对性的密码学设计进行了完整修复：

第一处是 UKS（未知密钥共享攻击）漏洞： 传统 WireGuard 依靠静态 DH 隐式绑定身份，但替换成 KEM 后，这种隐式身份绑定失效了。这就导致攻击者可能制造出‘两端算出了同一把会话密钥，但对‘这把密钥在和谁共享’的认知不一致’的局面。本文的修复方案是：强行将双方静态公钥的哈希值（HASH(S_i, S_r)）直接注入 KEM 派生上下文，在显式层面重新锁死对端身份。

第二处是 KEM 语义混淆漏洞： 前人为了模仿传统 DH 的双向确定性（Deterministic），在封装时采用了‘确定性封装（Deterministic Encapsulation）’。但这破坏了标准抗量子 KEM 的随机性语义安全。本文的修复方案是：果断移除这种魔改，让 KEM 回归标准的随机化（Randomized）封装语义，确保抗量子密码学的理论根基不被动摇。

第三处是身份匿名性（Privacy）泄露： 在前人方案中，第一条握手消息（InitHello）里的后量子 KEM 密文 $ct_1$ 是明文传输的。由于后量子密文体积大、特征明显，网络监听者一眼就能嗅探出是谁在发起连接。本文的修复方案是：在 InitHello 阶段对 $ct_1$ 进行加密保护，使中间人无法识别通信方，成功修复了匿名性。

总结来说（对应下方橙色和白底框）： 修正后的 $PQ\text{-}WireGuard^\star$ 实现了对 UKS 抵抗、标准 KEM 语义、匿名性、前向保密和会话保密的全面覆盖。它作为一个完美的、纯后量子的无漏洞底座，为最终引入经典 DH 构成‘双保险’的 Hybrid-WireGuard 方案奠定了坚实的基础。

第一，让密钥和身份绑定。会话密钥不能只是由秘密材料算出来，还要明确绑定“这把 key 属于哪两个静态身份”。所以论文把双方静态公钥哈希进派生链，防止同钥不同人的情况。

第二，回到标准随机 KEM。早期 PQ-WireGuard 为了模仿 DH，做了某种 deterministic encapsulation，也就是封装过程更像“给定输入就固定输出”。问题是：这已经偏离标准 KEM 的安全语义了。形式化验证和真实 KEM 安全假设通常都建立在随机封装上。

第三处修的是匿名性。第一条 InitHello 是网络观察者最容易看到的地方。如果 KEM 密文裸露在这里，它可能变成识别通信方的线索。所以修正版把 ct₁ 也保护起来，让匿名性进入验证目标。

这三处修完之后，PQ-WireGuard⋆ 才是一个更干净的后量子侧。后面的 Hybrid-WireGuard 就是在这个基础上，再叠加经典 DH 防线。
-->

---
layout: default
---

<div class="deck-slide wg-hybrid-slide">
  <h2>2.5 Hybrid-WireGuard: 双侧安全边界的混合握手协议</h2>
  <p class="slide-lede">并行运行经典 DH 与后量子 KEM 独立状态派生链，通过两路秘密融合机制共同注入终级 KDF。</p>
  <div class="hybrid-chain">
    <div class="chain-step classic">
      <div class="paper-kicker">经典侧</div>
      <strong>1. 经典合规密码学兜底</strong>
      <p>完整承袭原生 WireGuard 经过时间验证的椭圆曲线 DH 派生链，保障传统合规性与前向安全性。</p>
    </div>
    <div class="chain-plus">+</div>
    <div class="chain-step pq">
      <div class="paper-kicker">后量子侧</div>
      <strong>2. 后量子安全性增强</strong>
      <p>并行引入抗量子 KEM 共享秘密，实现对未来强敌“现在拦截，后续解密”攻击的鲁棒性。</p>
    </div>
    <div class="chain-plus">+</div>
    <div class="chain-step context">
      <div class="paper-kicker">绑定材料</div>
      <strong>3. 全局上下文哈希绑定</strong>
      <p>将双端身份哈希、报文方向因子及预共享密钥复合注入，确立本轮握手生命周期的唯一性绑定。</p>
    </div>
  </div>
  <div class="hybrid-cnf">
    <div class="cnf-formula">Break(Hybrid, property) = Break(WireGuard, property) ∧ Break(PQ-WireGuard⋆, property)</div>
    <div class="cnf-plain">复合安全原语：敌手必须具备同时瓦解经典与后量子两条防线的交错能力，方能破坏协议的整体安全性。</div>
  </div>
</div>

<!--

现在，我们终于来到了本篇论文的核心成果：Hybrid-WireGuard。

在修复了纯后量子方案的缺陷后，论文采取了一种‘并行派生、末端聚合’的设计。它在协议中同时运行了原生 WireGuard 的经典 DH 派生链，以及我们刚刚修正过的 PQ-WireGuard⋆ 的后量子 KEM 派生链。

我们可以从三个板块来看看输入这个混合方案的‘配方’：

    第一，经典侧： DH 秘密进入派生。这完整保留了 WireGuard 极轻量、成熟的经典安全兜底和前向保密能力。

    第二，后量子侧： KEM 秘密进入派生。注入了抗量子秘密，阻断未来量子计算机通过拦截流量进行的追溯性解密。

    第三，绑定材料： 将身份哈希、消息传输方向以及预共享密钥（PSK）打包一起输入，把所有新老材料牢牢锁定在当前这同一轮的握手上下文中，防范重放和越权。

最终，这两侧产出的共享秘密，会被共同合进最后的 KDF（密钥派生函数）中。

这带来了本篇论文最重要的形式化验证结论（对应图中的公式）：
论文通过 Tamarin 穷举证明，混合方案某一安全性质被破坏的条件，等于经典 WireGuard 被攻破 且（∧） PQ-WireGuard⋆ 同时被攻破。

换句话说，攻击者如果只有经典黑客手段，攻不破后量子侧；或者未来有了量子计算机，但无法拿到当下的经典私钥，也攻不破经典侧。单独攻破任何一侧都是徒劳的，攻击者必须同时跨过两道防线。 论文在 Table 6 中将这种‘混合安全’落成了可由机器自动化检查的数学结论，完美实现了后量子迁移的平滑与高可靠过渡。

-->

---
layout: default
---

<div class="deck-slide wg-tools-slide">
  <h2>2.6 异构多工具协同验证流水线</h2>
  <p class="slide-lede">鉴于单一符号验证工具在代数推理、状态搜索效率及等价性验证上的能力边界，文章构建了协同验证工作流，实现优势互补。</p>
  <div class="tool-chain-grid">
    <div class="tool-chain-card spec">
      <div class="paper-kicker">SAPIC+</div>
      <strong>1. 统一形式化建模</strong>
      <p>以 SAPIC+ 作为统一中间表示（IR），"实现单源建模，多靶点自动编译编译与分发"。</p>
    </div>
    <div class="tool-chain-card fast">
      <div class="paper-kicker">ProVerif</div>
      <strong>2. 广度路径空间初筛</strong>
      <p>利用 ProVerif 高效的高阶无界状态搜索能力，快速枚举并粗筛出海量泄露路径与潜在攻击面。</p>
    </div>
    <div class="tool-chain-card algebra">
      <div class="paper-kicker">Tamarin</div>
      <strong>3. 深度代数属性推导</strong>
      <p>Tamarin 更适合处理 Diffie-Hellman 这类带代数结构的协议步骤。</p>
    </div>
    <div class="tool-chain-card equiv">
      <div class="paper-kicker">DeepSec</div>
      <strong>4. 隐私痕迹观测等价性验证</strong>
      <p>调用 DeepSec 验证双向进程的跟踪等价性，对会话匿名性提供严格形式化担保。</p>
    </div>
  </div>
  <div class="speed-note">面对混合协议引发的 2³⁵ 次方级动态泄露组合爆炸，论文提出的自适应评估机制成功将 4860 个原始验证查询剪枝约束至不到 30 个，将理论上的计算不可行转化为高效的自动化工程运行。</div>
</div>

<!--
介绍完混合方案后，我们来看看本文在形式化验证方法学上的重大创新。

在面对如此复杂的混合协议时，单一的验证工具往往会遇到瓶颈。因为有的工具擅长快速扫描，有的擅长复杂的数学推理，有的则专攻匿名性。为此，本文首创性地提出了一个‘多工具协同验证框架’。

整个流水线分为四个步骤（对应图中的四个卡片）：

    首先，是规范统一化（使用 SAPIC+）： 验证的第一步是降低建模成本。论文利用 SAPIC+ 作为中间表示层，只需要编写一份核心协议规范，就能自动翻译并分发给后续的各个验证器。

    其次，是路径大面积初筛（使用 ProVerif）： 利用 ProVerif 强大的快速跑路径能力，在极短时间内遍历出海量的路径和潜在的泄露条件。

    第三，是代数深度推理（使用 Tamarin）： 针对 ProVerif 无法深度处理的 Diffie-Hellman 代数特性，由 Tamarin 接手进行高精度的归纳法证明。

    最后，是隐私属性特检（使用 DeepSec）： 专门调用 DeepSec 来验证混淆后的密文是否达到了‘观察者不可区分’的强匿名性要求。

这一套组合拳的效果非常震撼（对应下方自适应评估框）： > 面对混合方案可能带来的 235 种天文数字般的动态泄露组合，如果直接用单个工具暴力搜索，计算资源会瞬间崩溃。而本文通过多工具协同的‘自适应评估算法’，把 4860 个极其困难的验证查询压缩到了不到 30 个。这直接让一个原本在工程上‘不可承受’的验证任务，变成了‘高效可运行’的现实。实现了把不同的安全问题，交给最合适的检查器去处理。
-->

---
layout: center
---

# 感谢聆听

---
layout: default
hide: true
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
hide: true
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
hide: ture
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
</div>

<!--
主线其实很清楚：验证推动设计修正。  

论文先找到早期 PQ-WireGuard 里身份理解不一致的问题。  

第二步，发现问题以后，论文先修 PQ-WireGuard，得到 PQ-WireGuard⋆。这里包括回到标准随机 KEM，把静态身份放进派生链，还有补匿名性。  

第三步，最后才验证 Hybrid-WireGuard。经典 DH 和后量子 KEM 同时进入握手，Table 6 给出的结论是：破坏条件变成两侧合取。  

-->

---
layout: default
hide: true
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
hide: true
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
hide: true
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
hide: true
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
hide: true
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
hide: true
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
hide: true
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
hide: true
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
hide: true
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
hide: true
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
hide: true
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
hide: true
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
hide: true
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
