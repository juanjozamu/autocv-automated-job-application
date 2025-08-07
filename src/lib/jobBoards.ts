// Simulación de portales de trabajo (combinando APIs gratuitas y de pago)
const JOB_BOARDS = [
  // APIs Gratuitas
  'Adzuna Jobs API',
  'JSearch API (RapidAPI)',
  'Reed API (UK)',
  'Arbeitnow API',
  'Jobs API by APILayer',
  
  // Portales Públicos (Web Scraping)
  'Indeed España',
  'LinkedIn Jobs',
  'InfoJobs',
  'Glassdoor España',
  'Monster España',
  'Randstad',
  'Adecco',
  'ManpowerGroup',
  'Hays',
  'Michael Page',
  
  // Portales Especializados
  'Stack Overflow Jobs',
  'AngelList',
  'Dice',
  'CyberSeek',
  'GitHub Jobs',
  'Remote.co',
  'We Work Remotely',
  'FlexJobs',
  'Upwork',
  'Freelancer',
  
  // Portales Locales España
  'Trabajos.com',
  'Empleos.net',
  'Laboris',
  'Tecnoempleo',
  'Computrabajo España',
  'Jobatus',
  'Milanuncios Trabajo',
  'Domestika Jobs',
  'Startupxplore',
  'TheHubMadrid',
  
  // Portales Internacionales
  'CareerBuilder',
  'ZipRecruiter',
  'SimplyHired',
  'Snagajob',
  'Robert Half',
  'Kelly Services',
  'Temp Partners',
  'Express Employment',
  'Spherion',
  'Aerotek',
  
  // Portales de Tecnología
  'Honeypot',
  'Hired',
  'Toptal',
  'Gun.io',
  'Codementor',
  'X-Team',
  'Gitcoin',
  'CryptoJobs',
  'Blockchain Jobs',
  'AI Jobs',
  
  // Portales de Startups
  'Startup Jobs',
  'Founder Groups',
  'Venture Loop',
  'StartupHire',
  'Startup Grind Jobs',
  'Product Hunt Jobs',
  'Indie Hackers',
  'Nomad List',
  'Remote Year',
  'Pangian',
  
  // Portales Corporativos
  'Corporate Careers - Google',
  'Corporate Careers - Microsoft',
  'Corporate Careers - Amazon',
  'Corporate Careers - Apple',
  'Corporate Careers - Meta',
  'Corporate Careers - Netflix',
  'Corporate Careers - Tesla',
  'Corporate Careers - Spotify',
  'Corporate Careers - Uber',
  'Corporate Careers - Airbnb',
  
  // Portales de Consultoría
  'McKinsey Careers',
  'BCG Careers',
  'Bain Careers',
  'Deloitte Careers',
  'PwC Careers',
  'EY Careers',
  'KPMG Careers',
  'Accenture Careers',
  'IBM Careers',
  'Capgemini Careers',
  
  // Portales de Finanzas
  'eFinancialCareers',
  'Wall Street Oasis',
  'Finance Jobs',
  'Banking Jobs',
  'Investment Jobs',
  'Hedge Fund Jobs',
  'Private Equity Jobs',
  'Venture Capital Jobs',
  'Fintech Jobs',
  'Crypto Finance Jobs',
  
  // Portales Adicionales para llegar a 100
  'Jobsora',
  'Jooble',
  'Neuvoo',
  'Trovit Empleos',
  'Mitula Empleos',
  'Talent.com',
  'Careerjet',
  'Jobs.es',
  'Empleo.com',
  'Trabajar.com'
]

export interface JobApplication {
  jobBoard: string
  status: 'success' | 'failed'
  message: string
  timestamp: string
  responseTime?: number
}

export interface JobPreferences {
  position?: string
  location?: string
  salaryMin?: string
  experience?: string
  keywords?: string
}

export async function applyToJobs(
  cvFile: File, 
  preferences: JobPreferences = {}
): Promise<JobApplication[]> {
  const results: JobApplication[] = []
  
  console.log(`Iniciando envío de CV a ${JOB_BOARDS.length} portales de trabajo...`)
  console.log('Preferencias del usuario:', preferences)
  
  // Simular el procesamiento del CV
  await simulateDelay(1000, 2000) // 1-2 segundos para "procesar" el CV
  
  for (let i = 0; i < JOB_BOARDS.length; i++) {
    const jobBoard = JOB_BOARDS[i]
    const startTime = Date.now()
    
    try {
      // Simular tiempo de respuesta variable para cada portal
      const responseTime = await simulateJobBoardApplication(jobBoard, cvFile, preferences)
      const endTime = Date.now()
      
      // Simular tasa de éxito realista (aproximadamente 75-85% de éxito)
      const isSuccess = Math.random() > 0.2 // 80% de éxito
      
      const result: JobApplication = {
        jobBoard,
        status: isSuccess ? 'success' : 'failed',
        message: isSuccess 
          ? 'CV enviado exitosamente' 
          : getRandomErrorMessage(),
        timestamp: new Date().toISOString(),
        responseTime: endTime - startTime
      }
      
      results.push(result)
      
      // Log del progreso
      if ((i + 1) % 10 === 0) {
        console.log(`Progreso: ${i + 1}/${JOB_BOARDS.length} portales procesados`)
      }
      
    } catch (error) {
      // Manejar errores de aplicación individual
      results.push({
        jobBoard,
        status: 'failed',
        message: `Error de conexión: ${error instanceof Error ? error.message : 'Error desconocido'}`,
        timestamp: new Date().toISOString(),
        responseTime: Date.now() - startTime
      })
    }
  }
  
  const successCount = results.filter(r => r.status === 'success').length
  const failCount = results.filter(r => r.status === 'failed').length
  
  console.log(`Envío completado: ${successCount} exitosos, ${failCount} fallidos de ${results.length} total`)
  
  return results
}

async function simulateJobBoardApplication(
  jobBoard: string, 
  cvFile: File, 
  preferences: JobPreferences
): Promise<number> {
  // Simular diferentes tiempos de respuesta según el tipo de portal
  let baseDelay = 500 // 500ms base
  
  if (jobBoard.includes('API')) {
    // APIs son más rápidas
    baseDelay = 200
  } else if (jobBoard.includes('Corporate')) {
    // Portales corporativos pueden ser más lentos
    baseDelay = 1000
  } else if (jobBoard.includes('Startup')) {
    // Startups suelen ser rápidas
    baseDelay = 300
  }
  
  // Añadir variabilidad aleatoria
  const randomDelay = Math.random() * 500
  const totalDelay = baseDelay + randomDelay
  
  await simulateDelay(totalDelay, totalDelay + 200)
  
  // Simular algunos errores ocasionales de red
  if (Math.random() < 0.05) { // 5% de probabilidad de error de red
    throw new Error('Timeout de conexión')
  }
  
  return totalDelay
}

function simulateDelay(minMs: number, maxMs?: number): Promise<void> {
  const delay = maxMs ? minMs + Math.random() * (maxMs - minMs) : minMs
  return new Promise(resolve => setTimeout(resolve, delay))
}

function getRandomErrorMessage(): string {
  const errorMessages = [
    'Portal temporalmente no disponible',
    'Error de autenticación con el portal',
    'Límite de aplicaciones diarias alcanzado',
    'Formato de CV no compatible',
    'Error de conexión de red',
    'Portal en mantenimiento',
    'Filtros de spam activados',
    'Requiere registro manual previo',
    'API rate limit excedido',
    'Error interno del portal'
  ]
  
  return errorMessages[Math.floor(Math.random() * errorMessages.length)]
}

// Función auxiliar para obtener estadísticas de los portales
export function getJobBoardStats() {
  return {
    total: JOB_BOARDS.length,
    byType: {
      apis: JOB_BOARDS.filter(board => board.includes('API')).length,
      corporate: JOB_BOARDS.filter(board => board.includes('Corporate')).length,
      startups: JOB_BOARDS.filter(board => board.includes('Startup')).length,
      specialized: JOB_BOARDS.filter(board => 
        board.includes('Tech') || board.includes('Finance') || board.includes('Crypto')
      ).length,
      local: JOB_BOARDS.filter(board => board.includes('España')).length
    }
  }
}

// Función para obtener la lista de portales (útil para debugging)
export function getJobBoardsList(): string[] {
  return [...JOB_BOARDS]
}
