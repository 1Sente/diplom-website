import https from 'https';

interface ProxmoxConfig {
  host: string;
  node: string;
  tokenId: string;
  tokenSecret: string;
}

export class ProxmoxAPI {
  private config: ProxmoxConfig;
  private httpsAgent: https.Agent;

  constructor() {
    this.config = {
      host: process.env.PROXMOX_HOST || '',
      node: process.env.PROXMOX_NODE || 'pve',
      tokenId: process.env.PROXMOX_TOKEN_ID || '',
      tokenSecret: process.env.PROXMOX_TOKEN_SECRET || '',
    };

    // Proxmox по умолчанию использует самоподписанные сертификаты,
    // поэтому в локальной сети мы отключаем проверку SSL для API-запросов.
    this.httpsAgent = new https.Agent({
      rejectUnauthorized: false,
    });
  }

  private async request<T>(endpoint: string, method: string = 'GET', data?: any): Promise<T> {
    const url = `${this.config.host}/api2/json/nodes/${this.config.node}${endpoint}`;
    
    const headers = {
      'Authorization': `PVEAPIToken=${this.config.tokenId}=${this.config.tokenSecret}`,
      'Content-Type': 'application/json',
    };

    const options: RequestInit = {
      method,
      headers,
      // @ts-ignore - node-fetch specific, Next.js fetch patches might handle this differently, but for native Node it's required
      agent: this.httpsAgent, 
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(url, options);
      const result = await response.json();

      if (!response.ok) {
        console.error('Proxmox API Error:', result);
        throw new Error(result.errors || result.message || 'Ошибка API Proxmox');
      }

      return result.data;
    } catch (error) {
      console.error(`Proxmox API Request Failed: ${endpoint}`, error);
      throw error;
    }
  }

  // Получить статус ноды (для проверки подключения)
  async getNodeStatus() {
    return this.request('/status');
  }

  // Клонировать виртуальную машину (из шаблона)
  async cloneVM(templateId: number, newVmId: number, newVmName: string) {
    return this.request(`/qemu/${templateId}/clone`, 'POST', {
      newid: newVmId,
      name: newVmName,
      full: 1, // Полный клон (не linked)
      storage: process.env.PROXMOX_STORAGE_POOL || 'local-lvm',
    });
  }

  // Настроить Cloud-Init (IP, пароль)
  async configureCloudInit(vmId: number, ip: string, gateway: string, password: string) {
    return this.request(`/qemu/${vmId}/config`, 'POST', {
      ipconfig0: `ip=${ip}/24,gw=${gateway}`,
      cipassword: password,
      // Можно также задать пользователя: ciuser: 'root'
    });
  }

  // Запустить ВМ
  async startVM(vmId: number) {
    return this.request(`/qemu/${vmId}/status/start`, 'POST');
  }
}

export const proxmoxAPI = new ProxmoxAPI();
