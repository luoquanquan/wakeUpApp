// 构造函数参数
export interface LaunchAppOptions {
    fbUrl: string
    wxAppId: string
    appConf: string
    universalLink: string
    yoda: any
}

// hidden 兼容
export type Hidden = 'hidden' | 'webkitHidden' | 'msHidden' | undefined

// VisibilityChange 兼容
export type VisibilityChange = | 'visibilitychange' | 'webkitvisibilitychange' | 'msvisibilitychange' | undefined
