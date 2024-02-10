import { useCallback } from "react";

const sanitize = (string) => {
    const map = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#x27;",
        "/": "&#x2F;",
    };
    const reg = /[&<>"'/]/gi;
    return string.replace(reg, (match) => map[match]);
};

export const TimeCalculate = () => {
    const formattedDateTime = new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });

      return formattedDateTime
}

const hasValidMin = (value, min) => {
    return value.length >= min;
};

export function Input({ onSubmit, placeholder, label, defaultValue, onBlur }) {
    const handleBlur = useCallback(() => {
        if (onBlur)
            onBlur();
    }, [onBlur]);

    const handleKeyDown = useCallback(
        (e) => {
            if (e.key === "Enter") {
                const value = e.target.value.trim();

                if (!hasValidMin(value, 2))
                    return;

                onSubmit(sanitize(value), TimeCalculate() );
                e.target.value = "";
            }
        },
        [onSubmit]
    );

    return (
        <div className="input-container">
            <input className="new-todo" id="todo-input" type="text" data-testid="text-input" autoFocus placeholder={placeholder} defaultValue={defaultValue} onBlur={handleBlur} onKeyDown={handleKeyDown} />
            <label className="visually-hidden" htmlFor="todo-input">
                {label}
            </label>
        </div>
    );
}
