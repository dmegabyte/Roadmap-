import React from 'react';
import {
  UserCircleIcon,
  DataIcon,
  CpuChipIcon,
  FunnelIcon,
  ShieldCheckIcon,
  ChatBubbleBottomCenterTextIcon,
  ClipboardCheckIcon,
} from './Icons';

const flowSteps = [
    {
        icon: UserCircleIcon,
        title: '1. Запрос пользователя и маскировка PII',
        description: 'Пользователь отправляет запрос. Все персональные данные (ПД) немедленно заменяются безопасными плейсхолдерами (например, `{phone_0}`) перед дальнейшей обработкой.',
    },
    {
        icon: DataIcon,
        title: '2. Поиск в базе знаний (RAG) и API',
        description: 'Система ищет в векторизованной базе знаний семантически релевантные фрагменты информации для ответа. При необходимости могут вызываться внешние API (например, CRM) или выполняться прямой поиск в SQL-базе для получения структурированных данных, например, при запросе номера телефона.',
    },
    {
        icon: CpuChipIcon,
        title: '3. Ассистент А (Core): Генерация черновика',
        description: 'Core-ассистент синтезирует найденную информацию в черновой ответ, дополняя его `evidence` — ссылками на источники и оценками уверенности.',
    },
    {
        icon: FunnelIcon,
        title: '4. Проверка №1: Фильтр уверенности',
        description: 'Все источники с уверенностью ниже порогового значения (например, 80%) автоматически отбрасываются. Если надёжных источников не остаётся, запускается fallback-логика (уточняющий вопрос).',
    },
    {
        icon: ShieldCheckIcon,
        title: '5. Проверка №2: Guard-LLM (Контроль фактов)',
        description: '(Опционально) Независимая QA-модель проверяет черновик ответа на соответствие источникам, чтобы предотвратить галлюцинации и фактические ошибки.',
    },
    {
        icon: ChatBubbleBottomCenterTextIcon,
        title: '6. Финальный ответ и демаскировка PII',
        description: 'Формируется итоговый, проверенный ответ. Безопасные плейсхолдеры заменяются на исходные персональные данные, чтобы пользователь получил естественный ответ.',
    },
    {
        icon: ClipboardCheckIcon,
        title: '7. Ответ пользователю и логирование',
        description: 'Пользователь получает полный и естественный ответ. Все метрики цикла (задержка, уверенность, срабатывание проверок) записываются в систему мониторинга для анализа.',
    },
];

const FlowStep: React.FC<{ step: typeof flowSteps[0]; isLast: boolean }> = ({ step, isLast }) => (
    <div className="flex">
        <div className="flex flex-col items-center mr-4">
            <div>
                <div className="flex items-center justify-center w-14 h-14 bg-slate-700/50 rounded-full border border-slate-600">
                    <step.icon className="w-8 h-8 text-sky-400" />
                </div>
            </div>
            {!isLast && <div className="w-px h-full bg-slate-600/70 my-2"></div>}
        </div>
        <div className="pb-10 pt-2">
            <h4 className="font-bold text-lg text-white mb-1">{step.title}</h4>
            <p className="text-slate-400">{step.description}</p>
        </div>
    </div>
);


const DialogueFlow: React.FC = () => {
    return (
        <div className="mt-4">
            {flowSteps.map((step, index) => (
                <FlowStep key={index} step={step} isLast={index === flowSteps.length - 1} />
            ))}
        </div>
    );
};

export default DialogueFlow;