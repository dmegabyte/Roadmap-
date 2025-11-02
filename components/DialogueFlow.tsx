
import React from 'react';
import {
  UserCircleIcon,
  DataIcon,
  CpuChipIcon,
  ShieldCheckIcon,
  ChatBubbleBottomCenterTextIcon,
  ClipboardCheckIcon,
  MagnifyingGlassPlusIcon,
} from './Icons';

interface DialogueFlowProps {
    onNavigate: (stageId: string) => void;
}

const flowSteps = [
    {
        icon: UserCircleIcon,
        title: '1. Запрос пользователя и маскировка PII',
        description: 'Пользователь отправляет запрос. Все персональные данные (ПД) немедленно заменяются безопасными плейсхолдерами (например, `{phone_0}`) перед дальнейшей обработкой.',
        stageId: 'q1s1',
    },
    {
        icon: MagnifyingGlassPlusIcon,
        title: '2. AI Query Optimizer',
        description: 'Запрос обогащается контекстом (сегмент, категория) и переформулируется, чтобы RAG-поиск мог найти наиболее релевантные документы.',
        stageId: 'q3s1',
    },
    {
        icon: CpuChipIcon,
        title: '3. Поиск, фильтрация и генерация ответа',
        description: 'Система ищет релевантные фрагменты (RAG), отбрасывает источники с уверенностью ниже 80% и синтезирует черновой ответ. Если надёжных источников нет, запускается fallback-логика с уточняющим вопросом.',
        stageId: 'q1s4',
    },
    {
        icon: ShieldCheckIcon,
        title: '4. Проверка: Guard-LLM (Контроль фактов)',
        description: '(Опционально) Независимая QA-модель проверяет черновик ответа на соответствие источникам, чтобы предотвратить галлюцинации и фактические ошибки.',
        stageId: 'q3s2',
    },
    {
        icon: ChatBubbleBottomCenterTextIcon,
        title: '5. Финальный ответ и демаскировка PII',
        description: 'Формируется итоговый, проверенный ответ. Безопасные плейсхолдеры заменяются на исходные персональные данные, чтобы пользователь получил естественный ответ.',
        stageId: 'q2s3',
    },
    {
        icon: ClipboardCheckIcon,
        title: '6. Ответ пользователю и логирование',
        description: 'Пользователь получает полный и естественный ответ. Все метрики цикла (задержка, уверенность, срабатывание проверок) записываются в систему мониторинга для анализа.',
        stageId: 'q2s2',
    },
];

const FlowStep: React.FC<{ step: typeof flowSteps[0]; isLast: boolean; onNavigate: (stageId: string) => void; }> = ({ step, isLast, onNavigate }) => (
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
            <h4 className="font-bold text-xl text-white mb-1">{step.title}</h4>
            <p className="text-lg text-slate-400">{step.description}</p>
            {step.stageId && (
                <button
                    onClick={() => onNavigate(step.stageId)}
                    className="group inline-flex items-center gap-2 mt-3 text-sky-400 hover:text-sky-300 font-semibold text-base transition-colors"
                >
                    Подробнее об этапе
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                </button>
            )}
        </div>
    </div>
);


const DialogueFlow: React.FC<DialogueFlowProps> = ({ onNavigate }) => {
    return (
        <div className="mt-4">
            {flowSteps.map((step, index) => (
                <FlowStep key={index} step={step} isLast={index === flowSteps.length - 1} onNavigate={onNavigate} />
            ))}
        </div>
    );
};

export default DialogueFlow;