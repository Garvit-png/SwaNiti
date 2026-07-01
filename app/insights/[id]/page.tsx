"use client"

import { use, useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { 
  ArrowLeft, 
  ArrowRight, 
  Heart, 
  Share2, 
  MoreHorizontal, 
  Copy, 
  Check, 
  MessageSquare, 
  Loader2,
  ExternalLink,
  Download
} from 'lucide-react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import styles from './post.module.css'

type Author = {
  name: string
  role: string
  photo: string
}

type BlogDetails = {
  id: string
  title: string
  coverTitle: string
  coverSub: string
  coverUrl: string
  excerpt: string
  category: string
  readTime: string
  date: string
  author: Author
  contentHtml: React.ReactNode
  blogType?: 'editor' | 'medium' | 'pdf'
  mediumUrl?: string
  pdfUrl?: string
}

function PdfPage({ pdfDoc, pageNum }: { pdfDoc: any; pageNum: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let active = true;
    const renderPage = async () => {
      try {
        const page = await pdfDoc.getPage(pageNum);
        // Use 1.8x scale for extremely crisp, high-resolution rendering
        const viewport = page.getViewport({ scale: 1.8 });
        
        if (!active || !canvasRef.current) return;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        if (!context) return;

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({
          canvasContext: context,
          viewport: viewport,
        }).promise;
      } catch (err) {
        console.error('Error rendering PDF page:', err);
      }
    };

    renderPage();
    return () => {
      active = false;
    };
  }, [pdfDoc, pageNum]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%',
        maxWidth: '900px',
        height: 'auto',
        boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
        borderRadius: '8px',
        backgroundColor: '#ffffff'
      }}
    />
  );
}

function PdfRenderer({ url }: { url: string }) {
  const [pdfDoc, setPdfDoc] = useState<any>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const loadPdf = async () => {
      try {
        if (!(window as any).pdfjsLib) {
          const script = document.createElement('script');
          script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.min.js';
          document.head.appendChild(script);
          await new Promise((resolve) => {
            script.onload = resolve;
          });
        }

        const pdfjsLib = (window as any).pdfjsLib;
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';

        const pdf = await pdfjsLib.getDocument(url).promise;
        if (active) {
          setPdfDoc(pdf);
          setNumPages(pdf.numPages);
          setLoading(false);
        }
      } catch (err: any) {
        console.error(err);
        if (active) {
          setError('Failed to load PDF document.');
          setLoading(false);
        }
      }
    };

    loadPdf();
    return () => {
      active = false;
    };
  }, [url]);

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 0', gap: '16px' }}>
        <Loader2 className={styles.spinner} size={32} style={{ color: '#0B2228' }} />
        <span style={{ fontFamily: 'var(--font-inter)', color: '#64748b' }}>Loading document pages...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: '#ef4444', fontFamily: 'var(--font-inter)' }}>
        {error}
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%', alignItems: 'center', background: '#f8fafc', padding: '24px', borderRadius: '16px' }}>
      {Array.from({ length: numPages }, (_, i) => (
        <PdfPage key={i + 1} pdfDoc={pdfDoc} pageNum={i + 1} />
      ))}
    </div>
  );
}

// Full Blog Post Content and Database
const blogsData: Record<string, BlogDetails> = {
  'creative-future-ministry': {
    id: 'creative-future-ministry',
    title: "Institutionalizing India's Creative Future: The Case for a Dedicated Ministry of Creative Economy Post-WAVES 2025",
    coverTitle: "Institutionalizing India's Orange Future",
    coverSub: "World Audio Visual & Entertainment Summit #WAVES2025",
    coverUrl: "www.svaniti.in/mcea-project",
    excerpt: "The inaugural World Audio Visual & Entertainment Summit (WAVES) 2025, held in Mumbai, represents a landmark shift in India's policy trajectory.",
    category: "Policy",
    readTime: "8 min read",
    date: "Aug 1, 2026",
    author: {
      name: "Sagar Narayan",
      role: "Research Associate",
      photo: "/sagar.jpg"
    },
    contentHtml: (
      <>
        <p>
          The inaugural World Audio Visual & Entertainment Summit (WAVES) 2025, held in Mumbai, represents a landmark shift in India's policy trajectory. Organized by the Ministry of Information & Broadcasting, the summit served as a powerful platform that brought together global industry leaders, policymakers, investors, and creators, signalling a decisive push to position India as a global hub for content and creativity. The event's success, marked by the signing of Memorandums of Understanding (MoUs) worth over ₹5,000 crore, underscored the immense economic potential and strategic importance of India's creative sectors.
        </p>

        {/* WAVES Person Image floated left */}
        <div className={styles.mediaFloatLeft}>
          <img 
            src="/waves-person.png" 
            alt="Sagar Narayan at WAVES 2025" 
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>

        <p>
          WAVES 2025 has energized India's creative economy with vision and infrastructure. But to translate this vision into sustained impact, India must institutionalize creativity through a dedicated ministry. Doing so will unlock innovation, economic value, cultural identity, and global influence - securing India's place as a 21st-century creative superpower.
        </p>
        <p>
          Creative industries have been defined as "those requiring creativity, skill and talent, with the potential for wealth and job creation through exploitation of their intellectual property" (DCMS, 2001). However, various terms are used contextually, leading to ambiguity which exists due to the multiplicity of meanings attached to the terms: Cultural and Creative Industries owing to differing contexts and applications (Colbert & Francois, 2012; Potts, Cunningham, Hartley, & Ormerod, 2008). At times, these two terms are either used together as "Cultural and Creative Industries" (CCI), or interchangeably when used separately.
        </p>

        <h2 className={styles.sectionHeader}>1. The Scale of India's Creative Economy</h2>
        <p>
          The creative economy, often called the "orange economy," refers to economic activities driven by human creativity, skill, and intellectual property. It encompasses a wide range of sectors including media and entertainment, design, fashion, publishing, performing arts, and crucially for modern India, the high-growth domains of AVGC (Animation, Visual Effects, Gaming and Comics), Over-The-Top (OTT) platforms, and digital content creation.
        </p>
        <p>
          Creative economy stands between the market and the society, formal and informal economies, and requires dedicated policy planning rooted in local contexts. Hence, it is important to recognize the nexus of place, culture, and economy in the discourse on CCI and the resultant socio-economic development.
        </p>
        <p>
          The idea of "creative industries" was first brought forward in the "Creative Nation" report published by the Labour Government of Australia in 1994. This report emphasized the role of culture in national identity and defined culture more broadly by including film, radio, television, performing arts, literature, dance, music, visual arts and crafts, copyrights, libraries, interactive multimedia, design, and more (Department of Communications and the Arts, 1994). This was the first time that the economic significance of cultural and creative industries was stressed. Creative industries found further support from the government of the United Kingdom, which in 1997, included creative industries in its development and political agenda, leading to the creation of the Department of Culture, Media, and Sports (DCMS, hereafter) and the Creative Industries Task Force.
        </p>
        <p>
          India, with its rich cultural diversity, deep storytelling traditions, and the world's largest youth population, is uniquely positioned to become a dominant force in this domain. The India's creative economy is already a significant contributor to the nation's finances, valued at approximately $30 billion and employing nearly 8% of the workforce. With creative exports surpassing $11 billion annually, the sector is a vital engine for both economic growth and the projection of India's soft power. As digital adoption accelerates, the contribution of these industries to India's GDP is poised for exponential growth.
        </p>

        <h2 className={styles.sectionHeader}>Maharashtra: Powering the Creative Engine</h2>
        <p>
          The Government of Maharashtra was a key partner in the WAVES 2025 Summit, reflecting the state's commitment to fostering a vibrant creative ecosystem. With Mumbai as the undisputed entertainment capital of India, the state government has actively supported the sector's growth. During the summit, Maharashtra not only facilitated significant investments but also announced a dedicated ₹700 crore fund to further boost the creative economy, signalling its ambition to develop Mumbai into a global hub for creative industries. The establishment of the Indian Institute of Creative Technology (IICT) in Mumbai is a cornerstone of this vision, aimed at nurturing world-class talent for the AVGC-XR sector.
        </p>

        <h2 className={styles.sectionHeader}>The Argument for a Ministry of Creative Economy</h2>
        <p>
          To fully capitalize on the momentum generated by events like WAVES 2025 and the rapid expansion of creative industries, India must adopt a more structured and strategic approach. The current governance of the creative economy is fragmented across various ministries, leading to regulatory overlaps, policy gaps, and a lack of unified vision.
        </p>
        <p>
          The central argument, therefore, is the urgent need to establish a Ministry of Creative Economy. This proposal is modelled on successful global examples, such as Indonesia's dedicated ministry, which has proven effective in driving growth and coherence in their creative sector. A dedicated ministry for India would:
        </p>

        <div className={styles.calloutBox}>
          <strong>Core Directives of the Proposed Ministry</strong>
          <ol style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li><strong>Consolidate Governance:</strong> Act as a single, nodal agency for all creative sectors, from traditional arts to digital media.</li>
            <li><strong>Drive Strategic Policy:</strong> Formulate and implement a cohesive national strategy for the creative economy, focusing on exports, job creation, and skill development.</li>
            <li><strong>Remove Bottlenecks:</strong> Streamline regulations, address intellectual property challenges, and create a more favorable environment for investment and innovation.</li>
            <li><strong>Provide Leadership:</strong> Champion India's creative industries on the global stage, forging international co-productions and partnerships.</li>
          </ol>
        </div>

        <h2 className={styles.sectionHeader}>SvaNiti's Advocacy for a Dedicated Ministry</h2>
        <p>
          This idea is actively being championed by SvaNiti, a policy think tank focused on translating public aspirations into actionable policy. In its 'Notion of Ministry of Creative Economy Affairs,' SvaNiti argues that a dedicated institutional framework is essential to unlock the sector's full potential. Their proposal emphasizes that such a ministry would provide the necessary policy backing and support for artists, innovators, and cultural entrepreneurs to thrive, ensuring that creativity is recognized as a core driver of India's economic and social development in the 21st century.
        </p>

        <h2 className={styles.sectionHeader}>WAVES Summit 2025: The Catalyst for Change</h2>
        <p>
          The WAVES Summit 2025 was more than just a conference; it was a powerful demonstration of India's creative might and a convergence point for critical policy discussions. By bringing together over 10,000 participants from more than 100 countries, facilitating thousands of business-to-business meetings, and launching transformative initiatives like the IICT and WAVES Bazaar, the summit created an undeniable momentum. It highlighted the vast opportunities within the sector while also implicitly revealing the structural challenges that a dedicated Ministry of Creative Economy would be designed to solve. In essence, WAVES 2025 set the stage and provided the perfect catalyst for this crucial policy evolution.
        </p>

        <h2 className={styles.sectionHeader}>2. Rationale for a Dedicated Ministry of Creative Economy</h2>
        <p>
          India's booming creative sector - spanning digital content, design, media, arts, and cultural industries - demands focused and unified governance. Establishing a dedicated Ministry of Creative Economy can bring transformative coherence to an ecosystem currently scattered across multiple initiatives and departments. Such a ministry can centralize and streamline policy direction across regulation, education, innovation, and market access - ensuring that India's creative economy scales with structure and vision.
        </p>
        <p>
          Globally, countries that institutionalized creative governance have seen measurable success. South Korea's Ministry of Culture, Sports and Tourism (MCST) played a pivotal role in orchestrating the global rise of 'H-culture' - from K-pop to cinema - contributing to record-breaking cultural exports by 2023. Similarly, the UK's Department for Digital, Culture, Media and Sport (DCMS) helped the UK creative industries contribute £125 billion to the economy in 2019, showcasing the power of a centralized strategy.
        </p>
        <p>
          At home, India's current creative economy is supported by multiple flagship schemes like Skill India, Digital India, Make in India, and Start-up India. However, the fragmented nature of these initiatives often results in fragmented outcomes. A dedicated ministry can bridge these silos, harmonize efforts, and provide clear direction for both public and private stakeholders.
        </p>
        <p>
          With over 2.5 million digital creators and counting, India has the world's largest and youngest creator base. A focused ministry could guide skill development, entrepreneurial support, and IP protections - transforming passion into sustainable livelihoods. Moreover, by implementing a single-window clearance system, India can enhance the ease of doing business for creative entrepreneurs, boost foreign collaborations, and implement stronger anti-piracy reforms.
        </p>
        <p>
          To ensure inclusive growth, the ministry could facilitate state-level creative hubs - supporting regional art forms, languages, and talents - under one national framework. Such decentralized outreach, backed by centralized vision, will democratize access to creative infrastructure.
        </p>
        <p>
          The ministry can also act as a key driver of India's cultural diplomacy, utilizing creative exports as a tool of soft power. In a world where digital presence defines global influence, positioning Indian creativity as a global soft power asset, the Ministry of Creative Economy is not merely an administrative reform - it is a strategic imperative for India to harness its creative potential, domestically and globally.
        </p>

        <h2 className={styles.sectionHeader}>3. Implementation Pathways and Institutional Design for a Dedicated Ministry of Creative Economy</h2>
        <p>
          Establishing a Ministry of Creative Economy requires a phased and strategically structured approach to ensure both efficiency and stakeholder buy-in. As an initial phase, the government can establish an independent Department under the Cabinet Secretariat, allowing for agile policy formulation and inter-ministerial coordination. This department can later evolve into a full-fledged ministry based on performance benchmarks, resource needs, and sectoral growth.
        </p>
        <p>
          The institutional design must emphasize integration of existing and emerging functions critical to the creative ecosystem. These include education and skill development through institutes like the Indian Institute of Creative Technologies (IICT) (proposed or restructured from existing institutions); export promotion and trade facilitation under the Ministry of Commerce; intellectual property (IP) protection in coordination with the DPIIT; digital platform regulation, development and implementation of AVGC (Animation, Visual Effects, Gaming, Comics) and XR (Extended Reality) policies; Artist Welfare - social security, pensions, and health schemes - must also be embedded as a core component.
        </p>
        <p>
          To ensure intergovernmental alignment and industry engagement, a Creative Economy Council should be established. This apex body will facilitate policy coherence among central ministries, state cultural and IT departments, and industry representatives, ensuring a unified national vision that reflects local priorities.
        </p>
        <p>
          Implementation must be rooted in public-private partnerships (PPP). Creative incubators, production studios, and digital content platforms can be developed collaboratively. Each state should house a nodal office to operationalize policies, manage grants, organize state-level creative fairs, and provide training. These decentralized nodes will strengthen last-mile delivery and ensure regional inclusion.
        </p>
        <p>
          A robust digital backbone is essential. A centralized national platform should be developed to offer end-to-end services: creator registration, IP licensing, content authentication, monetization channels, and data analytics. Such a platform will also enable transparency, reduce regulatory friction, and expand market access for individual creators and enterprises alike.
        </p>
        <p>
          This institutional model - starting lean, integrating cross-sectoral functions, leveraging state machinery, and fostering public-private collaboration - can effectively position India's creative economy as a driver of innovation, employment, and cultural influence. With deliberate design and stakeholder collaboration, the ministry can deliver both strategic governance and tangible benefits to millions across the country.
        </p>

        <h2 className={styles.sectionHeader}>4. Challenges and Considerations for a Dedicated Ministry of Creative Economy</h2>
        <p>
          While the establishment of a Dedicated Ministry of Creative Economy holds transformative promise, several critical challenges and considerations must be addressed for successful implementation:
        </p>

        {/* WAVES Stage Image floated left */}
        <div className={styles.mediaFloatLeftWide}>
          <img 
            src="/waves-stage.png" 
            alt="Delegates on stage at WAVES 2025" 
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>

        <p>
          First, bureaucratic resistance is a likely hurdle. Existing ministries - such as Culture, Information & Broadcasting, Education, Commerce, and Electronics & IT - may resist relinquishing control or feeling dilution of their mandates. This makes clear role demarcation and inter-ministerial coordination vital. The ministry must function as a harmonizing body rather than a competing one, focusing on convergence rather than control.
        </p>
        <p>
          Second, budgetary allocation will pose a challenge. Creative sectors often straddle both commercial and cultural goals, which may lead to confusion over funding priorities. Allocations must be guided by performance metrics and impact assessment to ensure efficient deployment across areas such as infrastructure development, IP protection, artist welfare, and export facilitation. Public-private partnerships can help supplement government investment, but a strong accountability framework is essential.
        </p>
        <p>
          Third, the definition of the "creative economy" itself requires legal and institutional clarity. The term encompasses a vast range - from traditional artisans to digital creators, and from IP-intensive industries like design and gaming to informal folk arts. Without a precise and inclusive definition, policy risks being either too narrow or too diluted. A unified classification system aligned with global standards like those used by WIPO or UNCTAD will be crucial.
        </p>
        <p>
          Finally, the ministry must be careful to avoid the pitfalls of over-centralization. While it should offer infrastructure, incentives, and regulatory clarity, it must not become a gatekeeper of creativity. Innovation in the creative economy thrives on freedom, decentralization, and diversity. Policies must be enabling - not prescriptive - particularly in content regulation and licensing frameworks.
        </p>
      </>
    )
  },
  'darshan-yatra-discovery': {
    id: 'darshan-yatra-discovery',
    title: "Viksit Bharat Yatra: Transforming Youth through Self-Discovery",
    coverTitle: "Transforming Youth through Self-Discovery",
    coverSub: "Honoring Prime Minister's Mission for a Developed India by 2047",
    coverUrl: "www.svaniti.in/darshan-yatra",
    excerpt: "Fostering leadership and philosophical reflection through solo travel and deep civic engagements across the historic landscapes of Bharat.",
    category: "Youth",
    readTime: "6 min read",
    date: "Aug 15, 2026",
    author: {
      name: "Aadil Belim",
      role: "Founder & Chief Vision Officer",
      photo: "/adil.png"
    },
    contentHtml: (
      <>
        <p>
          The Viksit Bharat Yatra is a flagship youth empowerment movement that encourages young citizens to embark on journeys of self-discovery, civic engagement, and national integration. Backed by the vision of a developed India by 2047, this project challenges the youth to step out of their classrooms and experience the diverse realities, heritage, and growth stories of Bharat firsthand.
        </p>
        <p>
          Through curated solo travel itineraries, fellows explore rural innovations, historical landmarks, and localized governance models. This experiential learning process fosters philosophical reflection, problem-solving skills, and a deep-seated commitment to nation-building.
        </p>
        <h2 className={styles.sectionHeader}>Key Objectives of the Yatra</h2>
        <p>
          The yatra is built around three core pillars: Experiential Learning, Cultural Anchoring, and Civic Contribution. By engaging directly with local communities, participants gain a nuanced understanding of grass-roots policy implementation and identify opportunities for developmental innovation.
        </p>
      </>
    )
  },
  'lifesite-classroom-paradigm': {
    id: 'lifesite-classroom-paradigm',
    title: "The LifeSite Paradigm: Evolving Beyond the Traditional Classroom",
    coverTitle: "Evolving Beyond the Traditional Classroom",
    coverSub: "An Educational Framework Rooted in Bharatiya Values",
    coverUrl: "www.svaniti.in/lifesite",
    excerpt: "Exploring an educational framework rooted in Bharatiya values that transcends standard schools and universities, empowering holistic development.",
    category: "Education",
    readTime: "8 min read",
    date: "Sep 2, 2026",
    author: {
      name: "Aadil Belim",
      role: "Founder & Chief Vision Officer",
      photo: "/adil.png"
    },
    contentHtml: (
      <>
        <p>
          The LifeSite paradigm represents a radical reimagining of learning and development. Anchored in traditional Bharatiya educational philosophies, it moves away from standard industrial-age schooling toward an ecosystem model that nurtures the intellectual, emotional, and spiritual dimensions of an individual.
        </p>
        <p>
          Rather than viewing learning as a transactional phase confined to early life, LifeSite establishes a continuous, community-integrated ecosystem. Here, knowledge is co-created through direct life experiences, mentorship, and collective reflection.
        </p>
        <h2 className={styles.sectionHeader}>The Silo-Free Learning Model</h2>
        <p>
          By breaking down artificial disciplinary boundaries, the LifeSite framework facilitates multidisciplinary exploration. Students engage with ecology, philosophy, technology, and governance dynamically, preparing them to solve complex real-world challenges with values and wisdom.
        </p>
      </>
    )
  },
  'sva-bharat-movement-aspirations': {
    id: 'sva-bharat-movement-aspirations',
    title: "Sva-Bharat Movement: Channelling the Collective Aspirations of a Nation",
    coverTitle: "Channelling Collective Aspirations of a Nation",
    coverSub: "Uniting campus and regional ambassadors to shape public policy",
    coverUrl: "www.svaniti.in/sva-bharat",
    excerpt: "How campus and regional ambassadors are coming together to shape public policy, youth leadership, and direct civic dialogues.",
    category: "Movement",
    readTime: "4 min read",
    date: "Sep 18, 2026",
    author: {
      name: "Uzma A",
      role: "Director & Chief Culture Officer",
      photo: "/uzma.jpg"
    },
    contentHtml: (
      <>
        <p>
          The Sva-Bharat Movement is a decentralized platform that connects young civic leaders, thinkers, and policy enthusiasts across the campus networks of India. It represents SvaNiti's commitment to grass-roots advocacy, creating space for youth voices to directly influence local and national governance policy discussions.
        </p>
        <p>
          Through regional chapters and campus ambassadorships, the movement hosts dialogue circles, hackathons, and town-hall assemblies. These platforms capture the key development needs and aspirations of citizens, translating them into policy proposals.
        </p>
        <h2 className={styles.sectionHeader}>Building the Bridge of Civic Dialogue</h2>
        <p>
          The network acts as a two-way channel, helping policymakers communicate structural reforms to local populations, while aggregating localized insights and feedback to refine policy designs. This ensures governance remains responsive and transparent.
        </p>
      </>
    )
  },
  'creative-economy-multiplier': {
    id: 'creative-economy-multiplier',
    title: "Creative Economy: The Multiplier Effect for Bharat's Economic Growth",
    coverTitle: "The Multiplier Effect for Bharat's Economic Growth",
    coverSub: "Unlocking opportunities in employment, exports, and digital content",
    coverUrl: "www.svaniti.in/creative-multiplier",
    excerpt: "Unlocking new opportunities in employment, tourism, exports, and social inclusion by integrating technology and indigenous arts into global pipelines.",
    category: "Policy",
    readTime: "7 min read",
    date: "Oct 5, 2026",
    author: {
      name: "Sagar Narayan",
      role: "Research Associate",
      photo: "/sagar.jpg"
    },
    contentHtml: (
      <>
        <p>
          The creative economy represents a massive, underutilized engine for India's economic growth. By blending cultural assets with modern digital tech pipelines, the creative sector can drive job creation, increase services exports, and foster inclusive development across regional economies.
        </p>
        <p>
          From the digital creator economy to indie games, traditional design houses, and regional cinema, creative industries have a high employment elasticity. Investing in the creative ecosystem ensures last-mile economic opportunities, especially for youth and women in tier-2 and tier-3 cities.
        </p>
        <h2 className={styles.sectionHeader}>The Spillover Impact</h2>
        <p>
          A vibrant creative sector generates massive positive spillovers for other industries, including tourism, digital hardware manufacturing, and telecommunications. By positioning creative exports strategically, India can significantly enhance its global branding and soft power assets.
        </p>
      </>
    )
  }
}

import allBlogsData from '../../data/blogs.json'

export default function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const id = resolvedParams.id
  
  const oldBlog = blogsData[id]
  const jsonBlog = (allBlogsData as any[]).find(b => b.id === id)

  const blog = oldBlog || (jsonBlog ? {
    id: jsonBlog.id,
    title: jsonBlog.title,
    excerpt: jsonBlog.excerpt,
    category: jsonBlog.category,
    readTime: jsonBlog.readTime,
    author: jsonBlog.author || { name: 'Admin', role: 'Guest', photo: '/logo.png' },
    date: jsonBlog.date || 'Today',
    coverTitle: jsonBlog.title,
    coverSub: '',
    coverUrl: jsonBlog.coverUrl || '',
    blogType: jsonBlog.blogType || 'editor',
    mediumUrl: jsonBlog.mediumUrl || '',
    pdfUrl: jsonBlog.pdfUrl || '',
    contentHtml: <div dangerouslySetInnerHTML={{ __html: jsonBlog.contentHtml || `<p>${jsonBlog.excerpt}</p>` }} />
  } : blogsData['creative-future-ministry'])


  const [menuOpen, setMenuOpen] = useState(false)
  const [liked, setLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(12)
  const [copied, setCopied] = useState(false)
  
  // Comments state
  const [commentsLoading, setCommentsLoading] = useState(true)
  const [commentsList, setCommentsList] = useState([
    {
      author: "Eshaak J",
      role: "Research Associate",
      time: "2 hours ago",
      text: "Establishing IICT in Mumbai is definitely the right move. The focus on AVGC-XR will build a highly-skilled workforce for global projects."
    },
    {
      author: "Uzma A",
      role: "Director & CCO",
      time: "5 hours ago",
      text: "The consolidated governance model is desperately needed. Right now, creators have to deal with multiple ministries which slows down registration and IP protections."
    }
  ])
  const [newComment, setNewComment] = useState("")

  // Simulate comments loading for premium micro-animation feel
  useEffect(() => {
    const timer = setTimeout(() => {
      setCommentsLoading(false)
    }, 1200)
    return () => clearTimeout(timer)
  }, [])

  const handleLike = () => {
    if (liked) {
      setLiked(false)
      setLikesCount(prev => prev - 1)
    } else {
      setLiked(true)
      setLikesCount(prev => prev + 1)
    }
  }

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    setCommentsList(prev => [
      {
        author: "Anonymous Reader",
        role: "Guest Contributor",
        time: "Just now",
        text: newComment.trim()
      },
      ...prev
    ])
    setNewComment("")
  }

  return (
    <main className={styles.page}>
      {/* HEADER NAVBAR CONTAINER */}
      <div className={styles.navContainer}>
        <Navbar activePath="/insights" onMenuClick={() => setMenuOpen(true)} />
      </div>

      <article className={styles.articleContainer}>
        {/* Breadcrumb Back Button */}
        <Link href="/insights" className={styles.backLink}>
          <ArrowLeft size={16} />
          <span>Back to Insights</span>
        </Link>

        {/* Blog Post Title */}
        <h1 className={styles.title}>{blog.title}</h1>

        {/* Author Metadata Bar */}
        <div className={styles.authorMeta}>
          <div className={styles.authorLeft}>
            <Image 
              src={blog.author.photo} 
              alt={blog.author.name} 
              width={48} 
              height={48} 
              className={styles.avatar} 
            />
            <div className={styles.authorDetails}>
              <span className={styles.authorName}>{blog.author.name}</span>
              <span className={styles.metaText}>
                {blog.author.role}
                <span className={styles.dot} />
                {blog.date}
                <span className={styles.dot} />
                {blog.readTime}
              </span>
            </div>
          </div>

          <div className={styles.authorRight}>
            <button className={styles.actionBtn} onClick={handleCopyLink} title="Copy link to clipboard">
              {copied ? <Check size={18} style={{ color: '#00b4d8' }} /> : <Copy size={18} />}
            </button>
            <button className={styles.actionBtn} title="More options">
              <MoreHorizontal size={18} />
            </button>
          </div>
        </div>

        {/* Cover Banner Card (Styled hexagon block) */}
        <div 
          className={styles.coverCard}
          style={blog.coverUrl?.startsWith('/') ? { 
            backgroundImage: `linear-gradient(rgba(5, 17, 20, 0.6), rgba(5, 17, 20, 0.8)), url('${blog.coverUrl}')`, 
            backgroundSize: 'cover', 
            backgroundPosition: 'center' 
          } : {}}
        >
          <div className={styles.coverPattern} />
          
          <div className={styles.coverHeader}>
            <span className={styles.coverAuthorTag}>Article by {blog.author.name}</span>
          </div>

          <div className={styles.coverCenter}>
            <h2 className={styles.coverCenterTitle}>
              {blog.coverTitle.includes("Orange") ? (
                <>
                  {blog.coverTitle.split("Orange")[0]}
                  <span className={styles.orangeText}>Orange</span>
                  {blog.coverTitle.split("Orange")[1]}
                </>
              ) : (
                blog.coverTitle
              )}
            </h2>
          </div>

          <div className={styles.coverFooter}>
            <span className={styles.coverSummit}>{blog.coverSub}</span>
            <span className={styles.coverLink}>{blog.coverUrl?.startsWith('/') ? 'View Source Article' : blog.coverUrl}</span>
          </div>
        </div>

        {/* Article Body Content */}
        <div className={styles.bodyContent}>
          {blog.blogType === 'medium' && (
            <div className={styles.mediumPreviewCard}>
              <div className={styles.mediumTitle}>This article is published on Medium</div>
              <p style={{ maxWidth: '600px', margin: '0 auto 20px', color: 'rgba(11, 34, 40, 0.7)' }}>
                {blog.excerpt || 'Read the full publication and engage with the community directly on the Medium platform.'}
              </p>
              <a 
                href={blog.mediumUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.mediumButton}
              >
                Read on Medium <ExternalLink size={16} />
              </a>
            </div>
          )}
          {blog.blogType === 'pdf' && (
            <div className={styles.pdfViewerContainer}>
              <div className={styles.pdfDownloadBar} style={{ marginBottom: '24px' }}>
                <span className={styles.pdfDownloadText}>
                  Document: <strong>{blog.title}</strong> (PDF)
                </span>
                <a 
                  href={blog.pdfUrl} 
                  download 
                  className={styles.pdfDownloadBtn}
                >
                  Download PDF <Download size={14} />
                </a>
              </div>
              <PdfRenderer url={blog.pdfUrl || ''} />
            </div>
          )}

          {(blog.blogType === 'editor' || !blog.blogType) && blog.contentHtml}
        </div>

        {/* Social Share & Likes Bar */}
        <div className={styles.shareBar}>
          <div className={styles.shareIcons}>

            <button className={styles.shareBtn} onClick={handleCopyLink} title="Copy link">
              {copied ? <Check size={18} style={{ color: '#00b4d8' }} /> : <Copy size={18} />}
            </button>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.shareBtn} 
              title="Share on LinkedIn"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="2" y="9" width="4" height="12"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.shareBtn} 
              title="Share on Twitter"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
              </svg>
            </a>
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.shareBtn} 
              title="Share on Facebook"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
          </div>
        </div>

      </article>

      {/* FOOTER */}
      <Footer />
    </main>
  )
}
