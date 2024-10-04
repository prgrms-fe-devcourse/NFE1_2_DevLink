const hasValueProperty = <T extends HTMLElement>(target: EventTarget): target is T => {
  return "value" in target;
};

export { hasValueProperty };
